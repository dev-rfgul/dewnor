import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import Stripe from 'stripe';


import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import adminRoutes from './routes/admin.routes.js'
import { cloudinaryConnect } from './config/cloudinary.js';
import cookieParser from 'cookie-parser';





const app = express();
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log("the stripe key is ", process.env.STRIPE_SECRET_KEY)

var corsOption = {
    origin: ["https://dewnor-frontend.onrender.com",process.env.FRONT_END_URL],  // No empty strings, must match frontend
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
    // console.log("the test route from index.js")
    res.send("the test route from index.js")
})

app.get('/', (req, res) => {
    res.send(" the backend is working")
})
app.post("/makePayment", async (req, res) => {
    try {
        const { products } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid product data" });
        }

        // Creating line items for Stripe Checkout
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "AED",
                product_data: {
                    name: product.name,
                    images: product.images ? [product.images] : [] // Ensure it's an array
                },
                unit_amount: product.price * 100, // Convert to cents
            },
            quantity: 1, // Adjust quantity as needed
        }));

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: lineItems,
            success_url: `${process.env.FRONT_END_URL}/payment/success`,
            cancel_url: `${process.env.FRONT_END_URL}/payment/cancel`,

        });

        console.log("Payment session created successfully");
        res.json({ sessionId: session.id });

    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ error: "Failed to create Stripe session" });
    }
});






app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/admin', adminRoutes)





const port = process.env.LOCALHOST
console.log(" hello the backend is running on port :", port)
// console.log(" hello the frontend is running on port :", process.env.FRONT_END_URL)

app.listen(port)

