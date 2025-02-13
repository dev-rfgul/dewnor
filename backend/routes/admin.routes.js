import express from 'express'



import cloudinary, { cloudinaryConnect } from '../config/cloudinary.js';
import upload from '../middleware/multer.js'
import productModel from '../models/product.model.js';
import userModel from '../models/user.model.js';



const app = express();
cloudinaryConnect();


// Helper function to upload images to Cloudinary
const uploadImgsToCloudinary = async (files) => {
    try {
        const uploadPromises = files.map(file =>
            cloudinary.uploader.upload(file.path)  // Uploading each file to Cloudinary
        );
        const results = await Promise.all(uploadPromises);  // Wait for all uploads to finish
        return results.map(result => result.secure_url);  // Return the secure URLs of uploaded images
    } catch (error) {
        console.error('Error uploading images:', error);
    }
};


app.get('/test', (req, res) => {
    res.send("the route is working ")
})





app.post('/add-product', upload.array('image'), async (req, res) => {
    try {
        // Extract product details from the form data
        const { name, description, price, stock, color, size, SKU, category, tag } = req.body;

        // Handle file uploads
        const imageUrls = req.files && Array.isArray(req.files) && req.files.length > 0
            ? await uploadImgsToCloudinary(req.files)  // Upload the images to Cloudinary
            : [];

        // Create the product object
        const product = new productModel({
            name,
            description,
            price,
            stock,
            color,
            images: imageUrls,  // The uploaded image URLs
            size,
            SKU,
            category,
            tag,
        });

        // Save the product to the database
        await product.save();

        // Send a success response
        res.status(200).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});

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



//user routes
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
app.put('/edit-product/:id', upload.array('images',5), async (req, res) => {
    try {
        const { name, description, price, stock, color, size, SKU, category, tag } = req.body;

        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        let imageUrls = req.body.images || [];
        if (req.files && req.files.length > 0) {
            const uploadedImages = await uploadImgsToCloudinary(req.files);
            imageUrls = [...imageUrls, ...uploadedImages];
        }



        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            { name, description, price, stock, color, images: imageUrls, size, category, tag, SKU },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error('Error while updating product:', error);
        res.status(500).json({ message: "Error while updating the product", error: error.message });
    }
});

app.post('/add-user', async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new userModel({
        name,
        email,
        password,
        role,
    })
    await user.save();
    res.status(200).json({ message: "User created Successfully", user })
})

export default app;

