import express from 'express';
import dotenv from 'dotenv'
const app = express();
dotenv.config();


app.get('/', (req, res) => {
    res.send(" the backend is working")
})




const port = process.env.LOCALHOST
console.log(" hello the backend is running on port :", port)
app.listen(port)