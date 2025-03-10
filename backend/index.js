// import express from 'express';
// import dotenv from 'dotenv'
// import cors from 'cors';
// import Stripe from 'stripe';


// import { connectDB } from './config/db.js';
// import userRoutes from './routes/user.routes.js';
// import productRoutes from './routes/product.routes.js';
// import adminRoutes from './routes/admin.routes.js'
// import { cloudinaryConnect } from './config/cloudinary.js';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser'





// const app = express();
// dotenv.config();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// // console.log("the stripe key is ", process.env.STRIPE_SECRET_KEY)

// var corsOption = {
//     origin: ["https://dewnor-frontend.onrender.com", process.env.FRONT_END_URL],  // No empty strings, must match frontend
//     credentials: true,     // Allow cookies
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
// };

// app.use(cors(corsOption))
// app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB
// app.use(express.urlencoded({ limit: '10mb', extended: true }));
// connectDB();
// cloudinaryConnect();
// app.use(express.json());
// app.use(cookieParser())


// // console.log(process.env.FRONT_END_URL);


// app.get('/test', cors(corsOption), (req, res) => {
//     // console.log("the test route from index.js")
//     res.send("the test route from index.js")
// })

// app.get('/', (req, res) => {
//     res.send(" the backend is working")
// })
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
//                     images: product.images ? [product.images] : [] // Ensure it's an array
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
//             metadata: {
//                 userId: req.body.userId,
//                 products: JSON.stringify(products),
//                 address: req.body.address,
//             },
//         });


//         console.log("Payment session created successfully");
//         res.json({ sessionId: session.id });

//     } catch (error) {
//         console.error("Payment Error:", error);
//         res.status(500).json({ error: "Failed to create Stripe session" });
//     }
// });


// app.post(
//     "/webhook",
//     bodyParser.raw({ type: "application/json" }),
//     async (req, res) => {
//         const sig = req.headers["stripe-signature"];

//         let event;

//         try {
//             event = stripe.webhooks.constructEvent(
//                 req.body,
//                 process.env.STRIPE_WEBHOOK_SECRET,
//                 process.env.STRIPE_SECRET_KEY
//             );
//         } catch (err) {
//             console.error("Webhook signature verification failed:", err.message);
//             return res.status(400).send(`Webhook Error: ${err.message}`);
//         }

//         // ✅ Handle successful payment
//         if (event.type === "checkout.session.completed") {
//             const session = event.data.object;

//             // Store relevant info
//             const metadata = session.metadata || {};

//             try {
//                 const newOrder = new Order({
//                     userId: metadata.userId,
//                     products: JSON.parse(metadata.products), // sent as string
//                     totalAmount: session.amount_total / 100,
//                     paymentId: session.id,
//                     address: metadata.address,
//                 });
//                 await newOrder.save();

//                 // Admin message
//                 await AdminMessage.create({
//                     userId: metadata.userId,
//                     message: `New order: ${session.id}`,
//                     orderId: newOrder._id,
//                 });

//                 // Revenue update
//                 const revenueDoc = await Revenue.findOne();
//                 if (revenueDoc) {
//                     revenueDoc.total += session.amount_total / 100;
//                     await revenueDoc.save();
//                 } else {
//                     await Revenue.create({ total: session.amount_total / 100 });
//                 }

//                 console.log("✅ Order and admin updates complete");
//             } catch (err) {
//                 console.error("Order handling failed:", err);
//             }
//         }

//         res.status(200).json({ received: true });
//     }
// );




// app.use('/user', userRoutes);
// app.use('/product', productRoutes);
// app.use('/admin', adminRoutes)





// const port = process.env.LOCALHOST
// console.log(" hello the backend is running on port :", port)
// // console.log(" hello the frontend is running on port :", process.env.FRONT_END_URL)

// app.listen(port)



import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Stripe from 'stripe';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


import Order from './models/order.model.js';
import AdminMsg from './models/adminMsg.model.js';
import Revenue from './models/revenue.model.js';


import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { cloudinaryConnect } from './config/cloudinary.js';

// Load environment variables first
dotenv.config();

// Initialize app and services
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Properly handle CORS origins
const allowedOrigins = ["https://dewnor-frontend.onrender.com"];
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
// app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// Connect to database and services
connectDB();
cloudinaryConnect();
// Use express.json() for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
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

// Payment route
app.post("/makePayment", async (req, res) => {
    try {
        const { products, userId, address } = req.body;

        console.log("Payment request received:", {
            productsCount: products?.length,
            userId: userId?.substring(0, 5) + "..." // Log partial ID for privacy
        });

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid product data" });
        }

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Creating line items with validation
        const lineItems = products.map((product) => {
            console.log(`Processing product: ${product.name}, price: ${product.price}`);

            // Validate the price
            if (!product.price || isNaN(product.price) || product.price <= 0) {
                throw new Error(`Invalid price for product: ${product.name}`);
            }

            // Get a valid image URL or empty array
            let imageUrl = [];
            if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                if (typeof product.images[0] === 'string' && product.images[0].startsWith('http')) {
                    imageUrl = [product.images[0]];
                }
            }

            return {
                price_data: {
                    currency: "AED",
                    product_data: {
                        name: product.name || "Unnamed Product",
                        images: imageUrl
                    },
                    unit_amount: Math.round(product.price * 100),
                },
                quantity: 1,
            };
        });

        console.log("Line items created successfully");

        // Create a minimal version of products for metadata
        const minimalProducts = products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price
        }));

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: lineItems,
            success_url: `${process.env.FRONT_END_URL}/payment/success`,
            cancel_url: `${process.env.FRONT_END_URL}/payment/cancel`,
            metadata: {
                userId: userId,
                products: JSON.stringify(minimalProducts),
                address: address || "",
            },
        });

        console.log("Payment session created successfully:", session.id);
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Payment Error:", error.message);
        console.error(error.stack);
        res.status(500).json({
            error: "Failed to create Stripe session",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Webhook route - needs raw body
app.post(
    "/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
        const sig = req.headers["stripe-signature"];

        if (!sig) {
            return res.status(400).send("Stripe signature missing");
        }

        let event;

        try {
            // Fixed parameter order - body, signature, webhook secret (not stripe secret)
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.error("Webhook signature verification failed:", err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle successful payment
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const metadata = session.metadata || {};

            try {
                // Validate metadata
                if (!metadata.userId || !metadata.products) {
                    console.error("Missing required metadata in webhook");
                    return res.status(200).json({ received: true }); // Still return 200 to Stripe
                }

                let products;
                try {
                    products = JSON.parse(metadata.products);
                } catch (e) {
                    console.error("Failed to parse products JSON:", e);
                    return res.status(200).json({ received: true });
                }

                const newOrder = new Order({
                    userId: metadata.userId,
                    products: products,
                    totalAmount: session.amount_total / 100,
                    paymentId: session.id,
                    address: metadata.address || "",
                    status: "completed",
                    createdAt: new Date()
                });

                const savedOrder = await newOrder.save();

                // Admin message
                await AdminMsg.create({
                    userId: metadata.userId,
                    message: `New order: ${session.id}`,
                    orderId: savedOrder._id,
                    createdAt: new Date()
                });

                // Revenue update
                const revenueDoc = await Revenue.findOne();
                if (revenueDoc) {
                    revenueDoc.total += session.amount_total / 100;
                    await revenueDoc.save();
                } else {
                    await Revenue.create({
                        total: session.amount_total / 100,
                        updatedAt: new Date()
                    });
                }

                console.log("Order and admin updates complete");
            } catch (err) {
                console.error("Order handling failed:", err);
                // Still return 200 to Stripe to prevent retries
            }
        }

        res.status(200).json({ received: true });
    }
);

// API routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/admin', adminRoutes);

// Start server with proper port fallback
const port = process.env.PORT || process.env.LOCALHOST || 5000;
app.listen(port, () => {
    console.log(`Backend server running on port: ${port}`);
});

// Export for testing
export default app;