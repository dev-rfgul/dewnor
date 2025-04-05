// Improved Order schema
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    // Basic information
    customer_email: String,
    orderStatus: {
        type: String,
        enum: ['pending', 'dispatched', 'completed',],
        default: 'pending'
    },
    // Shipping information with more specific structure
    shipping: {
        name: String,
        address: {
            city: String,
            country: String,
            line1: String,
            line2: String,
            postal_code: String,
            state: String
        }
    },

    // Billing details with more specific structure
    billing_details: {
        address: {
            city: String,
            country: String,
            line1: String,
            line2: String,
            postal_code: String,
            state: String
        },
        email: String,
        name: String,
        phone: String
    },

    // Line items with more specific structure
    line_items: [{
        id: String,
        description: String,
        amount_subtotal: Number,
        img: String,
        amount_total: Number,
        currency: String,
        quantity: Number,
        price: {
            id: String,
            unit_amount: Number,
            currency: String,
            product: String
        }
    }],

    // Payment information
    amount_total: Number,
    payment_status: String,
    payment_intent: String,

    // Metadata
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Orders', orderSchema);