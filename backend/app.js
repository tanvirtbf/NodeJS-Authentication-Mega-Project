import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/connectDb.js'
import passport from 'passport'
import userRoutes from './routes/userRoutes.js'
import './config/passport-jwt-strategy.js'

const app = express()

const port = process.env.PORT

// cors setup..
const corsOptions = {
  // set origin to a specific origin
  origin: process.env.FRONTEND_HOST,
  Credential: true,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

// JSON 
app.use(express.json())

// Passport Middleware
app.use(passport.initialize())

// cookie-parser setup
app.use(cookieParser())

// Connect Database
const DATABASE_URL = process.env.DATABASE_URL
connectDB(DATABASE_URL)

// Routes
app.use("/api/user", userRoutes)

app.listen(port, ()=> {
  console.log(`Server listening at http://localhost:${port}`)
})

