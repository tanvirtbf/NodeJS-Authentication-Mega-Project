import express from 'express'
import { userLogin, userProfile, userRegistration, verifyEmail } from '../controllers/userController.js'
import refreshAccessToken from '../utils/refreshAccessToken.js'
import passport from 'passport'
import setAuthHeader from '../middlewares/setAuthHeader.js'

const router = express.Router()

// Public Routes
router.post('/register', userRegistration)
router.post('/verify-email', verifyEmail)
router.post('/login', userLogin)
router.post('/refresh-token', refreshAccessToken)

// Protected Routes
router.get('/me', setAuthHeader, passport.authenticate('jwt', { session: false }), userProfile)

export default router
