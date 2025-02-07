import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: [
        {
            type: String,
            required: true,
        }
    ],
    SKU: {
        type: String,
        required: true
    },
    tag: {
        type: String,
    },
    stock: {
        type: Number,
        required: true,
    },
    color: [{
        type: String,
    }],
    images: [{
        type: String,
        required: true,
    }],
    size: {
        type: String,
    }
})

const Products = mongoose.model('Products', ProductSchema);
export default Products;