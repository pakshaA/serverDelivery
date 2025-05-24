import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const db_connect = () => {
    mongoose.connect(process.env.MONGO_DB!)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error))
}

