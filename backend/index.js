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
console.log("the stripe key is ", process.env.STRIPE_SECRET_KEY)

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
app.post('/payment', (req, res) => {
    const { prduct, token } = req.body;
    console.log("PRODUCT", prduct);
    console.log("PRICE", prduct.price);
    const idempotencyKey = uuid(); // will generate a unique id key it will keep the record of the user is not being charged twice

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then((customer) => {
        stripe.charges.create({
            amount:prduct.price * 100, // multiplied by 100 as it will be in cents
            currency:'AED',
            customer: customer.id,
            receipt_email:token.email,
            description:`purchased of ${prduct.name}`,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
            }
        }, { idempotencyKey })
    }).then((result) => res.status(200).json(result))
    .catch(error=> console.log(error))
})
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/admin', adminRoutes)





const port = process.env.LOCALHOST
console.log(" hello the backend is running on port :", port)
// console.log(" hello the frontend is running on port :", process.env.FRONT_END_URL)

app.listen(port)

