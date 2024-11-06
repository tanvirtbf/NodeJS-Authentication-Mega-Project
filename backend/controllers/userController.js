import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import sendEmailVerificationOTP from '../utils/sendEmailVerificationOTP.js'
import EmailVerificationModel from '../models/EmailVerification.js'

// User Registration
const userRegistration = async(req,res) => {
  try {

    // Extract request body parameters
    const {name, email, password, password_confirmation} = req.body

    if(!name || !email || !password || !password_confirmation){
      return res.status(400).json({
        status: "failed",
        message: "All fields are required!"
      })
    }

    // if password and password_confirmation match
    if(password !== password_confirmation) {
      return res.status(400).json({
        status: "failed",
        message: "Password and Confirm Password don't match"
      })
    }

    // check if email already exists
    const existingUser = await UserModel.findOne({email})
    if(existingUser){
      return res.status(409).json({status: "failed", message: "Email already exists"})
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const newUser = await UserModel.create({ 
      name: name, 
      email: email, 
      password: hashedPassword 
    })

    sendEmailVerificationOTP(req, newUser)

    // Send Success response
    res.status(201).json({
      status: "Success",
      message: "Registration Success",
      user: { id: newUser._id, email: newUser.email },
    })


    
  } catch (error) {

    console.log(error)
    res.status(500).json({status: "failed", message:"Unable to Register, Please try again later!"})

  }
}

// User Email Verification

const verifyEmail = async (req,res)=> {
  try {

    // Extract request body parameters
    const { email, otp } = req.body

    // check if all required fields are provided
    if(!email || !otp){
      return res.status(400).json({ status: "failed", message:"All fields are required" })
    }

    // check if email doesn't exist
    const existingUser = await UserModel.findOne({email})
    if(!existingUser){
      return res.status(404).json({status: "failed", message: "Email doesn't exists"})
    }

    // Check if email is already verified
    if(existingUser.is_verified){
      return res.status(400).json({ status: "failed"})
    }

    // Check if there is a matching email verification OTP
    const emailVerification = await EmailVerificationModel.findOne({ userId: existingUser._id, otp: otp });
    if (!emailVerification) {
      if (!existingUser.is_verified) {
        // console.log(existingUser);
        await sendEmailVerificationOTP(req, existingUser);
        return res.status(400).json({ status: "failed", message: "Invalid OTP, new OTP sent to your email" });
      }
      return res.status(400).json({ status: "failed", message: "Invalid OTP" });
    }

    // Check if OTP is expired
    const currentTime = new Date();
    // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
    const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
    if (currentTime > expirationTime) {
      // OTP expired, send new OTP
      await sendEmailVerificationOTP(req, existingUser);
      return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
    }

    // OTP is valid and not expired, mark email as verified
    existingUser.is_verified = true;
    await existingUser.save();

    // Delete email verification document
    await EmailVerificationModel.deleteMany({ userId: existingUser._id });
    return res.status(200).json({ status: "success", message: "Email verified successfully" });

  } catch (error) {

    console.log(error)
    res.status(500).json({status: "failed", message:"Unable to Register, Please try again later!"})

  }
}

// User Login

// Get New Access Token OR Refresh Token

// Change Password

// Profile or Logged in User

// Send Password Reset Email

// Password Reset

// Logout

export { userRegistration, }

