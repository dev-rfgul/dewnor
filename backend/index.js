import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';


import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import adminRoutes from './routes/admin.routes.js'
import { cloudinaryConnect } from './config/cloudinary.js';
import cookieParser from 'cookie-parser';






const app = express();
dotenv.config();

var corsOption = {
    origin: process.env.FRONT_END_URL,  // No empty strings, must match frontend
    credentials: true,     // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOption))
app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
connectDB();
cloudinaryConnect();
app.use(express.json());
app.use(cookieParser())


// console.log(process.env.FRONT_END_URL);


app.get('/test', cors(corsOption), (req, res) => {
    console.log("the test route from index.js")
    res.send("the test route from index.js")
    console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
    console.log("Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET);
    console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
})

app.get('/', (req, res) => {
    res.send(" the backend is working")
})
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/admin', adminRoutes)





const port = process.env.LOCALHOST
console.log(" hello the backend is running on port :", port)
// console.log(" hello the frontend is running on port :", process.env.FRONT_END_URL)

app.listen(port)

