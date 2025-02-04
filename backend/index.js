const express = require('express');
const dotenv = require('dotenv')

const app = express();
dotenv.config();


app.get('/', (req, res) => {
    res.send("hello world the backend is working")
})



const port = process.env.LOCALHOST
console.log("the backend is running on port :",port)
app.listen(port)