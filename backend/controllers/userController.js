import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'

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
    console.log(existingUser)
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

// User Login

// Get New Access Token OR Refresh Token

// Change Password

// Profile or Logged in User

// Send Password Reset Email

// Password Reset

// Logout

export { userRegistration, }

