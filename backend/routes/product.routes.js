import express from 'express';
import productModel from '../models/product.model.js';
import userModel from '../models/user.model.js'
import mongoose from 'mongoose';



const app = express();








app.get('/test', (req, res) => {
    // console.log("the test route from index.js")
    res.send("the test route from index.js")
})
app.get('/get-products', async (req, res) => {
    const products = await productModel.find({})
    if (!products || products == 0) {
        return res.status(404).json({ message: "no product found" })
    }
    res.status(200).json({ message: "product found successfully,", products: products })    
})
app.get('/get-product/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "product not found" })
        }
        res.json({ message: "Product found", product });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/get-selected-products", async (req, res) => {
    try {
        const { ids } = req.body;
        // console.log("Received IDs:", ids);

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid IDs format" });
        }

        const objectIds = ids.map(id => new mongoose.Types.ObjectId(id));

        const products = await productModel.find({ _id: { $in: objectIds } });
        // console.log("Fetched Products:", products);

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products", error });
    }
});
app.post('/add-to-cart', async (req, res) => {
    try {
        const { productId, userId } = req.body;
        // console.log(productId, userId)
        const product = await productModel.findById(productId);
        // console.log(product)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        user.cart.push(productId);
        await user.save();
        res.json({ message: "Product added to cart successfully" })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

})
app.post('/remove-from-cart', async (req, res) => {
    try {
        const { productId, userId } = req.body;
        console.log(productId, userId)
        const product = await productModel.findById(productId);
        // console.log(product)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const index = user.cart.indexOf(productId);
        if (index > -1) {
            user.cart.splice(index, 1);
        }
        await user.save();
        res.json({ message: "Product removed from cart successfully" })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

})
app.get('/categories/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const products = await productModel.find({ tag: category });
        console.log(category)
        typeof (console.log(category))
        if (!products || products.length == 0) {
            return res.status(404).json({ message: `no products found in ${category} category ` })
        }
        res.status(200).json({ message: "products found successfully", products: products })
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Server error' });

    }
})






export default app;





