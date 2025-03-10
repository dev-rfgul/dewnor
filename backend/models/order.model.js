import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            quantity: Number,
            price: Number,
        },
    ],
    totalAmount: { type: Number, required: true },
    paymentId: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'pending' }, // pending, shipped, delivered
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
