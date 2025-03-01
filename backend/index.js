import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import Stripe from 'stripe';
import { v4 as uuid } from 'uuid';


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
    // console.log("the test route from index.js")
    res.send("the test route from index.js")
})

app.get('/', (req, res) => {
    res.send(" the backend is working")
})
// app.post("/makePayment", async (req, res) => {
//     try {
//         const { products } = req.body;

//         if (!products || !Array.isArray(products) || products.length === 0) {
//             return res.status(400).json({ error: "Invalid product data" });
//         }

//         // Creating line items for Stripe Checkout
//         const lineItems = products.map((product) => ({
//             price_data: {
//                 currency: "AED",
//                 product_data: {
//                     name: product.name,
//                     images: product.image ? [product.image] : [] // Ensure it's an array
//                 },
//                 unit_amount: product.price * 100, // Convert to cents
//             },
//             quantity: 1, // Adjust quantity as needed
//         }));

//         // Create a Stripe Checkout session
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             mode: "payment",
//             line_items: lineItems,
//             success_url: `${process.env.FRONT_END_URL}/payment/success`,
//             cancel_url: `${process.env.FRONT_END_URL}/payment/cancel`,

//         });

//         console.log("Payment session created successfully");
//         res.json({ sessionId: session.id });

//     } catch (error) {
//         console.error("Payment Error:", error);
//         res.status(500).json({ error: "Failed to create Stripe session" });
//     }
// });


app.post("/makePayment", async (req, res) => {
    try {
        const { products } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid product data" });
        }
        // Ensure API key is set correctly
        if (!process.env.STRIPE_SECRET_KEY || !process.env.FRONT_END_URL) {
            return res.status(500).json({ error: "Server misconfiguration: Missing API keys" });
        }

        // Generate a unique order ID
        const orderId = uuidv4();

        // Creating line items for Stripe Checkout
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "AED",
                product_data: {
                    name: product.name,
                    images: product.image ? [product.image] : []
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity || 1, // Ensure quantity is included
        }));

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: lineItems,
            metadata: { orderId }, // Store order ID for tracking
            success_url: `${process.env.FRONT_END_URL}/payment/success?orderId=${orderId}`,
            cancel_url: `${process.env.FRONT_END_URL}/payment/cancel?orderId=${orderId}`,
        });
        console.log(`Payment session created successfully for Order ID: ${orderId}`);
        res.json({ sessionId: session.id, orderId });
    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ error: "Failed to create Stripe session" });
    }
});

// Stripe webhook to handle successful payments
app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook Signature Verification Failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log(`Payment successful for Order ID: ${session.metadata.orderId}`);

        // TODO: Update order status in your database
    }

    res.json({ received: true });
});



app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/admin', adminRoutes)





const port = process.env.LOCALHOST
console.log(" hello the backend is running on port :", port)
// console.log(" hello the frontend is running on port :", process.env.FRONT_END_URL)

app.listen(port)

