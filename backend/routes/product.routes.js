import express from 'express';
import cloudinary from '../config/cloudinary.js';
import productModel from '../models/product.model.js';
import upload from '../middleware/multer.js';


const app = express();

app.get('/test', (req, res) => {
    console.log("the test route from index.js")
    res.send("the test route from index.js")
    console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
    console.log("Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET);
    console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
})
app.get('/get-products', (req, res) => {
    productModel.find({})
        .then(users => res.json(users))
        .catch(error => res.json(error))
})
app.post('/add-product', async (req, res) => {
    const { name, description, price, stock, color, images, size, SKU, category, tag } = req.body;
    const product = new productModel({
        name,
        description,
        price,
        stock,
        color,
        images,
        size,
        SKU,
        category,
        tag,
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
app.post('/upload-img', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No image file uploaded"
        });
    }

    cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Error while uploading image"
            });
        }

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            url: result.secure_url
        });
    });
});



export default app;




