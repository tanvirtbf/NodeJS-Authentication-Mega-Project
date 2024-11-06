import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "passportjsauth"
    }
    await mongoose.connect(DATABASE_URL, DB_OPTIONS.dbName)
    console.log('Connected Successfully...')
  } catch (error) {
    console.log('Error while connect database')
    console.log(error)
  }
}

export default connectDB