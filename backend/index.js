
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';


// Load environment variables first
dotenv.config();


import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import adminRoutes from './routes/admin.routes.js';
import paymentRoutes from './routes/payment.routes.js'
import AnalyticsRoutes from './routes/analytics.routes.js'
import { cloudinaryConnect } from './config/cloudinary.js';

// Initialize app and services
const app = express();

// Properly handle CORS origins

const allowedOrigins = ["https://dewnor2.vercel.app/"];
if (process.env.FRONT_END_URL) {
    allowedOrigins.push(process.env.FRONT_END_URL);
}

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply middleware in proper order
app.use(cors(corsOptions));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());



// Connect to database and services
connectDB();
cloudinaryConnect();


// Use express.json() for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === '/payment/webhook') {
        next(); // Skip express.json for webhook route
    } else {
        express.json({ limit: "10mb" })(req, res, next);
    }
});
// Basic routes
app.get('/test', (req, res) => {
    res.send("Test route is working");
});

app.get('/', (req, res) => {
    res.send("The backend is working");
});



// API routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/admin', adminRoutes);
app.use('/payment', paymentRoutes)
app.use('/analytics', AnalyticsRoutes)


// Start server with proper port fallback
const port = process.env.PORT || process.env.LOCALHOST || 5000;
app.listen(port, () => {
    console.log(`Backend server running on port: ${port}`);
});

export default app;
