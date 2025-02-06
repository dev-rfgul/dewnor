import express from 'express';

import productModel from '../models/product.model.js';


const app = express();

app.get('/test', (req, res) => {
    res.send("hello from the product routes page ")
})
app.get('/get-products', (req, res) => {
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
app.delete('/delete-product/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.put('/edit/:id', async (req, res) => {
    try {
        const { name, description, price, stock, color, images, size } = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            { name, description, price, stock, color, images, size },
            { new: true, runValidators: true } // Return updated doc & validate
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error while updating the product", error });
    }
});




export default app;


