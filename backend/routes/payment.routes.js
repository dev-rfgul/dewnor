
import express from 'express'
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Order from '../models/order.model.js'
import AdminMsg from '../models/adminMsg.model.js';
import Revenue from '../models/revenue.model.js';
import UserModel from '../models/user.model.js';
import ProductModel from '../models/product.model.js';

const app = express();
// Payment route
app.post("/makePayment", async (req, res) => {
    const session = await mongoose.startSession(); // Start a new session for MongoDB transaction
    session.startTransaction();

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const { products, userId, address } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid product data" });
        }

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Creating line items with validation
        const lineItems = products.map((product) => {
            if (!product.price || isNaN(product.price) || product.price <= 0) {
                throw new Error(`Invalid price for product: ${product.name}`);
            }

            let imageUrl = [];
            if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                if (typeof product.images[0] === 'string' && product.images[0].startsWith('http')) {
                    imageUrl = [product.images[0]];
                }
            }

            return {
                price_data: {
                    currency: "AED",
                    product_data: {
                        name: product.name || "Unnamed Product",
                        images: imageUrl,
                    },
                    unit_amount: Math.round(product.price * 100),
                },
                quantity: 1,
            };
        });

        // Create a Stripe Checkout session
        const sessionStripe = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            billing_address_collection: 'required',
            shipping_address_collection: { allowed_countries: ['AE'] },
            line_items: lineItems,
            success_url: `${process.env.FRONT_END_URL}/payment/success`,
            cancel_url: `${process.env.FRONT_END_URL}/payment/cancel`,
            metadata: {
                userId: userId,
                products: JSON.stringify(products),
                address: address || "",
            },
        });

        // Update stock
        for (const product of products) {
            console.log(product)
            const quantity = Number(product.quantity) || 1;
            const productId = product._id;

            const updatedProduct = await ProductModel.findByIdAndUpdate(
                productId,
                { $inc: { stock: -quantity } },
                { new: true, session }
            );

            if (!updatedProduct) {
                throw new Error(`Product not found or failed to update stock for product: ${productId}`);
            }
        }

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.json({ sessionId: sessionStripe.id });
    } catch (error) {
        // Rollback transaction in case of error
        await session.abortTransaction();
        session.endSession();

        console.error("Payment Error:", error.message);
        res.status(500).json({
            error: "Failed to create Stripe session",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Webhook route - needs raw body
app.post("/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
        const sig = req.headers["stripe-signature"];
        if (!sig) return res.status(400).send("Stripe signature missing");

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.error("Webhook signature verification failed:", err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const metadata = session.metadata || {};

            try {
                if (!metadata.userId || !metadata.products) {
                    console.error("Missing required metadata in webhook");
                    return res.status(200).json({ received: true });
                }

                let products;
                try {
                    products = JSON.parse(metadata.products);
                } catch (e) {
                    console.error("Failed to parse products JSON:", e);
                    return res.status(200).json({ received: true });
                }

                // ✅ Get line items
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
                    limit: 100,
                });

                const order = new Order({
                    customer_email: session.customer_details?.email || null,
                    shipping: session.shipping || {},
                    billing_details: {
                        address: session.customer_details?.address || {},
                        email: session.customer_details?.email || null,
                        name: session.customer_details?.name || null,
                        phone: session.customer_details?.phone || null
                    },
                    line_items: lineItems.data.map(item => ({
                        id: item.id,
                        description: item.description,
                        amount_subtotal: item.amount_subtotal,
                        amount_total: item.amount_total,
                        currency: item.currency,
                        quantity: item.quantity,
                        price: {
                            id: item.price?.id,
                            unit_amount: item.price?.unit_amount,
                            currency: item.price?.currency,
                            product: item.price?.product
                        }
                    })),
                    amount_total: session.amount_total,
                    payment_status: session.payment_status,
                    payment_intent: session.payment_intent
                });
                console.log(order)
                let savedOrder;
                try {
                    savedOrder = await order.save();
                    console.log('✅ Order saved!', savedOrder._id);
                } catch (error) {
                    console.error('❌ Order save error:', error.message);
                    console.error('Full error:', error);
                }


                // Admin Message
                await AdminMsg.create({
                    userId: metadata.userId,
                    message: `New order: ${session.id}`,
                    orderId: savedOrder._id,
                    createdAt: new Date()
                });

                // Revenue update
                const revenueDoc = await Revenue.findOne();
                if (revenueDoc) {
                    revenueDoc.total += session.amount_total / 100;
                    await revenueDoc.save();
                } else {
                    await Revenue.create({
                        total: session.amount_total / 100,
                        updatedAt: new Date()
                    });
                }

                console.log("✅ Order and admin updates complete");
            } catch (err) {
                console.error("❌ Order handling failed:", err);
            }
        }

        res.status(200).json({ received: true });
    }
);

export default app;