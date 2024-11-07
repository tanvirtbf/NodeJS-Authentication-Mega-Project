import express from 'express'
import { userRegistration, verifyEmail } from '../controllers/userController.js'

const router = express.Router()

// Public Routes
router.post('/register', userRegistration)
router.post('/verify-email', verifyEmail)

export default router
