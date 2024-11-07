import jwt from 'jsonwebtoken'

const generateTokens = async (user) => {
  try {

    const payload = { _id: user._id, roles: user.roles }

    // Generate access token with expiration time
    const accessTokenExp = Math.floor(Date.now() / 1000) + 100; // Set expiration to 100 seconds from now

    const accessToken = jwt.sign(
      { ...payload, exp: accessTokenExp },
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      // { expiresIn: '10s' }
    );

    // Generate refresh token with expiration time
    const refreshTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5; // Set expiration to 5 days from now
    const refreshToken = jwt.sign(
      { ...payload, exp: refreshTokenExp },
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      // { expiresIn: '5d' }
    );

  } catch (error) {
    
  }
}

export default generateTokens

