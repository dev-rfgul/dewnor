
import mongoose from 'mongoose';

export const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Database connected")
        // console.log("Cloudinary Cloud Name from db.js:", process.env.CLOUDINARY_CLOUD_NAME);
        
    })
}


