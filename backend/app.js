import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

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

// cookie-parser setup
app.use(cookieParser())

app.listen(port, ()=> {
  console.log(`Server listening at http://localhost:${port}`)
})

