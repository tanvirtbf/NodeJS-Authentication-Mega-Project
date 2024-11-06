import express from 'express'
import { userRegistration } from '../controllers/userController.js'

const router = express.Router()

// Public Routes
router.post('/register', userRegistration)

export default router
