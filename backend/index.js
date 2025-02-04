import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';


const app = express();
dotenv.config();
connectDB();


app.get('/', (req, res) => {
    res.send(" the backend is working")
})




const port = process.env.LOCALHOST
console.log(" hello the backend is running on port :", port)
app.listen(port)