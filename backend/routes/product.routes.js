import express from 'express';

import productModel from '../models/product.model.js';


const app = express();

app.get('/test', (req, res) => {
    res.send("hello from the product routes page ")
})
app.get('/all-products', (req, res) => {
    productModel.find({})
        .then(users => res.json(users))
        .catch(error => res.json(error))
})
app.post('/add-product', async (req, res) => {
    const { name, description, price, stock, color, images, size } = req.body;
    const product = new productModel({
        name,
        description,
        price,
        stock,
        color,
        images,
        size,
    })
    await product.save();
    res.status(200).json({ message: "Product created Successfully", product })
})
export default app;


