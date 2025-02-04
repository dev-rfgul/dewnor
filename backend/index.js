import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';


const app = express();
dotenv.config();
connectDB();
app.use(express.json());


app.get('/', (req, res) => {
    res.send(" the backend is working")
})
app.use('/user', userRoutes);


const port = process.env.LOCALHOST
console.log(" hello the backend is running on port :", port)
app.listen(port)