import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        
    const connect = await mongoose.connect(process.env.MONGO_URL)
    console.log('database connected', connect.connection.host)
        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

    
}