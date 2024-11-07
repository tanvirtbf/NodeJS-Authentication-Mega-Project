import express from 'express'
import { userLogin, userRegistration, verifyEmail } from '../controllers/userController.js'
import refreshAccessToken from '../utils/refreshAccessToken.js'

const router = express.Router()

// Public Routes
router.post('/register', userRegistration)
router.post('/verify-email', verifyEmail)
router.post('/login', userLogin)
router.post('/refresh-token', refreshAccessToken)

export default router
