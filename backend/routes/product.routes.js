import express from 'express';
import productModel from '../models/product.model.js';




const app = express();







app.get('/test', (req, res) => {
    console.log("the test route from index.js")
    res.send("the test route from index.js")
})
app.get('/get-products', (req, res) => {
    productModel.find({})
        .then(products => res.json(products))
        .catch(error => res.json(error))
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



export default app;




