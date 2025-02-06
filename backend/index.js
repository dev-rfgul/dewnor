import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';


import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';


var corsOption = {
    // origin: process.env.FRONT_END_URL,
    origin: "*",

}


const app = express();
dotenv.config();
app.use(cors(corsOption))

connectDB();
app.use(express.json());

app.get('/test', cors(corsOption), (req, res) => {
    console.log("the test route from index.js")
    res.send("the test route from index.js")
})

app.get('/', (req, res) => {
    res.send(" the backend is working")
})
app.use('/user', userRoutes);
app.use('/product', productRoutes);


const port = process.env.LOCALHOST
console.log(" hello the backend is running on port :", port)
app.listen(port)

