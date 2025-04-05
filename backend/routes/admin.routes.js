// import express from 'express'



// import cloudinary, { cloudinaryConnect } from '../config/cloudinary.js';
// import upload from '../middleware/multer.js'
// import productModel from '../models/product.model.js';
// import userModel from '../models/user.model.js';



// const app = express();
// cloudinaryConnect();


// // Helper function to upload images to Cloudinary
// const uploadImgsToCloudinary = async (files) => {
//     try {
//         const uploadPromises = files.map(file =>
//             cloudinary.uploader.upload(file.path)  // Uploading each file to Cloudinary
//         );
//         const results = await Promise.all(uploadPromises);  // Wait for all uploads to finish
//         return results.map(result => result.secure_url);  // Return the secure URLs of uploaded images
//     } catch (error) {
//         console.error('Error uploading images:', error);
//     }
// };
// const verifyAdmin = (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) return res.status(401).json({ message: "Unauthorized" });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden" });

//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };


// app.get('/test', (req, res) => {
//     res.send("the route is working ")
// })

// // product routes


// app.post('/add-product', upload.array('image'), async (req, res) => {
//     try {
//         console.log("Received body:", req.body); // Debugging

//         const { name, description, price, stock, color, size, SKU, category, tag } = req.body;

//         if (!name || !price || !stock) {
//             return res.status(400).json({ message: 'Name, price, and stock are required' });
//         }

//         // Ensure `color` is an array, remove empty values
//         const colors = Array.isArray(color)
//             ? color.map(c => c.trim()).filter(c => c !== "")
//             : [];

//         const imageUrls = req.files?.length ? await uploadImgsToCloudinary(req.files) : [];

//         const product = new productModel({
//             name,
//             description,
//             price: Number(price),
//             stock: Number(stock),
//             color: colors,
//             images: imageUrls,
//             size,
//             SKU,
//             category,
//             tag,
//         });

//         await product.save();
//         res.status(201).json({ message: 'Product created successfully', product });
//     } catch (error) {
//         console.error('Error creating product:', error);
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// });



// app.delete('/delete-product/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const product = await productModel.findByIdAndDelete(id);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.status(200).json({ message: "Product deleted", product });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
// app.get('/get-product/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const product = await productModel.findById(id);
//         if (!product) {
//             return res.status(404).json({ message: "product not found" })
//         }
//         res.json({ message: "Product found", product });
//     }
//     catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
// app.put('/edit-product/:id', upload.array('images', 5), async (req, res) => {
//     try {
//         const { name, description, price, stock, color, size, SKU, category, tag } = req.body;


//         let imageUrls = req.body.images || [];
//         if (req.files && req.files.length > 0) {
//             const uploadedImages = await uploadImgsToCloudinary(req.files);
//             imageUrls = [...imageUrls, ...uploadedImages];
//         }

//         // Ensure `color` is an array, remove empty values
//         const colors = Array.isArray(color)
//             ? color.map(c => c.trim()).filter(c => c !== "")
//             : color ? color.split(',').map(c => c.trim()).filter(c => c !== "") : [];


//         const updatedProduct = await productModel.findByIdAndUpdate(
//             req.params.id,
//             { name, description, price, stock, color: colors, images: imageUrls, size, category, tag, SKU },
//             { new: true, runValidators: true }
//         );

//         if (!updatedProduct) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
//     } catch (error) {
//         console.error('Error while updating product:', error);
//         res.status(500).json({ message: "Error while updating the product", error: error.message });
//     }
// });


// //user routes
// app.post('/add-user', async (req, res) => {
//     const { name, email, password, role } = req.body;
//     const user = new userModel({
//         name,
//         email,
//         password,
//         role,
//     })
//     await user.save();
//     res.status(200).json({ message: "User created Successfully", user })
// })

// export default app;



import express from 'express';
import jwt from 'jsonwebtoken'; // Ensure JWT is imported
import cloudinary, { cloudinaryConnect } from '../config/cloudinary.js';
import upload from '../middleware/multer.js';
import productModel from '../models/product.model.js';
import userModel from '../models/user.model.js';
import verifyAdmin from '../middleware/verifyAdmin.js';
import bcrypt from 'bcrypt'


import orderModel from '../models/order.model.js';

const app = express();
cloudinaryConnect();

// Helper function to upload images to Cloudinary
const uploadImgsToCloudinary = async (files) => {
    try {
        const uploadPromises = files.map(file =>
            cloudinary.uploader.upload(file.path)
        );
        const results = await Promise.all(uploadPromises);
        return results.map(result => result.secure_url);
    } catch (error) {
        console.error('Error uploading images:', error);
    }
};



app.get('/test', (req, res) => {
    res.send("The route is working");
});

// Product routes (Protected)
app.post('/add-product', verifyAdmin, upload.array('image'), async (req, res) => {
    try {
        const { name, description, price, stock, size, SKU, category, tag } = req.body;

        if (!name || !price || !stock) {
            return res.status(400).json({ message: 'Name, price, and stock are required' });
        }



        const imageUrls = req.files?.length ? await uploadImgsToCloudinary(req.files) : [];

        const product = new productModel({
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            images: imageUrls,
            size,
            SKU,
            category,
            tag,
        });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.delete('/delete-product/:id', verifyAdmin, async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/edit-product/:id', verifyAdmin, upload.array('images', 5), async (req, res) => {
    try {
        const { name, description, price, stock, color, size, SKU, category, tag } = req.body;

        let imageUrls = req.body.images || [];
        if (req.files && req.files.length > 0) {
            const uploadedImages = await uploadImgsToCloudinary(req.files);
            imageUrls = [...imageUrls, ...uploadedImages];
        }

        const colors = Array.isArray(color)
            ? color.map(c => c.trim()).filter(c => c !== "")
            : color ? color.split(',').map(c => c.trim()).filter(c => c !== "") : [];

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            { name, description, price, stock, color: colors, images: imageUrls, size, category, tag, SKU },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error while updating the product", error: error.message });
    }
});

app.post('/add-user', verifyAdmin, async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await user.save();

        const userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.password;

        res.status(201).json({ message: "User created successfully", user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
});
app.put('/update-order-status', async (req, res) => {
    const { orderID, orderStatus } = req.body;
    if (!orderID || !orderStatus) {
        return res.status(400).json({ message: "both order id and order status are required " })
    }
    try {
        const updateOrderStatus = await orderModel.findByIdAndUpdate(orderID, { orderStatus }, { new: true });
        if (!updateOrderStatus) {
            return res.status(400).json({ message: "Order not found" })
        }
        return res.status(200).json({ message: "order status update successfully" })
    }
    catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Server error", error });
    }

})


export default app;
