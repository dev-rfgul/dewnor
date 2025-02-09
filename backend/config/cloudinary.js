import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(
    console.log("just before cloudinary.config"),
    console.log(process.env.CLOUDINARY_API_KEY),
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

export default cloudinary;
