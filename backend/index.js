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
    console.log("the test route from index.js")
    res.send("the test route from index.js")
})

app.get('/', (req, res) => {
    res.send(" the backend is working")
})
console.log(stripe)
app.post('/payment', (req, res) => {
    const { product, token } = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);

    const idempotencyKey = uuid(); // Unique key to prevent duplicate charges

    stripe.customers.create({
        email: token.email,
        source: token.id
    })
        .then((customer) => {
            return stripe.charges.create({
                amount: product.price * 100, // Convert to cents
                currency: 'AED',
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchase of ${product.name}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        country: token.card.address_country
                    }
                }
            }, { idempotencyKey });
        })
        .then((result) => res.status(200).json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});
app.post("/payment2", async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/make-payment", async (req, res) => {
    const { products } = req.body;
    const lineItems = products.map((product) => ({
        price_data: {
            currency: "AED",
            product_data: {
                name: product.name,
                images: [product.image] // Changed 'image' to 'images'
            },
            unit_amount: product.price // Added comma before this line
        },
        quantity: product.quantity
    }));


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: '',
        cancel_url: '',
    })
    res.json({ id: session.id })

})

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/admin', adminRoutes)





const port = process.env.LOCALHOST
console.log(" hello the backend is running on port :", port)
// console.log(" hello the frontend is running on port :", process.env.FRONT_END_URL)

app.listen(port)

