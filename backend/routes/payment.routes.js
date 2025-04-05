
// import express from 'express'
// import Stripe from 'stripe';
// import bodyParser from 'body-parser';

// import Order from '../models/order.model.js'
// import AdminMsg from '../models/adminMsg.model.js';
// import Revenue from '../models/revenue.model.js'
// import UserModel from '../models/user.model.js'
// import productModel from '../models/product.model.js'


// const app = express();
// // Payment route
// app.post("/makePayment", async (req, res) => {
//     try {

//         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//         const { products, userId, address } = req.body;
//         console.log(products)
//         console.log("Payment request received:", {
//             productsCount: products?.length,
//             userId: userId?.substring(0, 5) + "..." // Log partial ID for privacy
//         });

//         if (!products || !Array.isArray(products) || products.length === 0) {
//             return res.status(400).json({ error: "Invalid product data" });
//         }

//         if (!userId) {
//             return res.status(400).json({ error: "User ID is required" });
//         }

//         // Creating line items with validation
//         const lineItems = products.map((product) => {
//             console.log(`Processing product: ${product.name}, price: ${product.price}`);

//             // Validate the price
//             if (!product.price || isNaN(product.price) || product.price <= 0) {
//                 throw new Error(`Invalid price for product: ${product.name}`);
//             }

//             // Get a valid image URL or empty array
//             let imageUrl = [];
//             if (product.images && Array.isArray(product.images) && product.images.length > 0) {
//                 if (typeof product.images[0] === 'string' && product.images[0].startsWith('http')) {
//                     imageUrl = [product.images[0]];
//                 }
//             }

//             return {
//                 price_data: {
//                     currency: "AED",
//                     product_data: {
//                         name: product.name || "Unnamed Product",
//                         images: imageUrl.length > 0 ? imageUrl : ["https://example.com/default-image.png"] // Add fallback image URL here if needed
//                     },
//                     unit_amount: Math.round(product.price * 100),
//                 },
//                 quantity: product.quantity,
//             };

//         });

//         console.log("Line items created successfully");

//         // Create a minimal version of products for metadata
//         const minimalProducts = products.map(p => ({
//             id: p._id,
//             name: p.name,
//             price: p.price,
//             quantity: p.quantity,
//         }));

//         // Create a Stripe Checkout session
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             mode: "payment",
//             billing_address_collection: 'required',
//             shipping_address_collection: {
//                 allowed_countries: ['AE'], // Customize this
//             },
//             line_items: lineItems,
//             success_url: `${process.env.FRONT_END_URL}/payment/success`,
//             cancel_url: `${process.env.FRONT_END_URL}/payment/cancel`,
//             metadata: {
//                 userId: userId,
//                 products: JSON.stringify(minimalProducts),
//                 address: address || "",
//             },
//         });

//         console.log("Payment session created successfully:", session.id);
//         await UserModel.findByIdAndUpdate(
//             userId,
//             {
//                 $set: { orderStatus: ['pending'] },
//                 $set: { cart: [] }
//             })
//         res.json({ sessionId: session.id });

//     } catch (error) {
//         console.error("Payment Error:", error.message);
//         console.error(error.stack);
//         res.status(500).json({
//             error: "Failed to create Stripe session",
//             details: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// });
// // Webhook route - needs raw body
// app.post("/webhook",
//     bodyParser.raw({ type: "application/json" }),
//     async (req, res) => {
//         const sig = req.headers["stripe-signature"];
//         if (!sig) return res.status(400).send("Stripe signature missing");

//         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//         let event;
//         try {
//             event = stripe.webhooks.constructEvent(
//                 req.body,
//                 sig,
//                 process.env.STRIPE_WEBHOOK_SECRET
//             );
//         } catch (err) {
//             console.error("Webhook signature verification failed:", err.message);
//             return res.status(400).send(`Webhook Error: ${err.message}`);
//         }

//         if (event.type === "checkout.session.completed") {
//             const session = event.data.object;
//             const metadata = session.metadata || {};

//             try {
//                 if (!metadata.userId || !metadata.products) {
//                     console.error("Missing required metadata in webhook");
//                     return res.status(200).json({ received: true });
//                 }

//                 let products;
//                 try {
//                     products = JSON.parse(metadata.products);
//                 } catch (e) {
//                     console.error("Failed to parse products JSON:", e);
//                     return res.status(200).json({ received: true });
//                 }

//                 // ✅ Get line items
//                 const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
//                     limit: 100,
//                 });

//                 const order = new Order({
//                     customer_email: session.customer_details?.email || null,
//                     shipping: session.shipping || {},
//                     billing_details: {
//                         address: session.customer_details?.address || {},
//                         email: session.customer_details?.email || null,
//                         name: session.customer_details?.name || null,
//                         phone: session.customer_details?.phone || null
//                     },
//                     line_items: lineItems.data.map(item => ({
//                         id: item.id,
//                         description: item.description,
//                         amount_subtotal: item.amount_subtotal,
//                         amount_total: item.amount_total,
//                         currency: item.currency,
//                         quantity: item.quantity,
//                         img: item.price.product_data.images[0] || "https://example.com/default-image.png", // Ensure you are fetching the image URL correctly
//                         price: {
//                             id: item.price?.id,
//                             unit_amount: item.price?.unit_amount,
//                             currency: item.price?.currency,
//                             product: item.price?.product
//                         }
//                     })),
//                     amount_total: session.amount_total,
//                     payment_status: session.payment_status,
//                     payment_intent: session.payment_intent
//                 });

//                 console.log(order);

//                 let savedOrder;
//                 try {
//                     // Save the order
//                     savedOrder = await order.save();

//                     // Update user's orders
//                     await UserModel.findByIdAndUpdate(
//                         metadata.userId,
//                         {
//                             $push: { orders: order._id },
//                         }
//                     );
//                     console.log('✅ Order saved!', savedOrder._id);

//                     // Update product stock for each product in the order
//                     if (Array.isArray(products)) {
//                         console.log("Products in webhook:", products);

//                         // Process each product
//                         for (const product of products) {
//                             const productId = product.id; // FIX: Use 'id' instead of '_id'
//                             const quantity = product.quantity || 1;

//                             console.log(`Updating stock for product ID: ${productId}, quantity: ${quantity}`);

//                             if (productId) {
//                                 // Decrement stock by purchased quantity
//                                 const updatedProduct = await productModel.findByIdAndUpdate(
//                                     productId,
//                                     { $inc: { stock: -quantity } },
//                                     { new: true }
//                                 );

//                                 if (updatedProduct) {
//                                     console.log(`✅ Updated stock for product ${productId}. New stock: ${updatedProduct.stock}`);

//                                     // Check if stock is low
//                                     if (updatedProduct.stock <= 5) {
//                                         console.log(`⚠️ Low stock alert for product ${productId}: ${updatedProduct.stock} remaining`);
//                                         // Add code here to notify admin about low stock
//                                     }
//                                 } else {
//                                     console.log(`❌ Product not found with ID: ${productId}`);
//                                 }
//                             }
//                         }
//                     }
//                 } catch (error) {
//                     console.error('❌ Order save or stock update error:', error.message);
//                     console.error('Full error:', error);
//                 }

//                 // Admin Message
//                 await AdminMsg.create({
//                     userId: metadata.userId,
//                     message: `New order: ${session.id}`,
//                     orderId: savedOrder._id,
//                     createdAt: new Date()
//                 });

//                 // Revenue update
//                 const revenueDoc = await Revenue.findOne();
//                 if (revenueDoc) {
//                     revenueDoc.total += session.amount_total / 100;
//                     await revenueDoc.save();
//                 } else {
//                     await Revenue.create({
//                         total: session.amount_total / 100,
//                         updatedAt: new Date()
//                     });
//                 }

//                 console.log("✅ Order and admin updates complete");
//             } catch (err) {
//                 console.error("❌ Order handling failed:", err);
//             }
//         }

//         res.status(200).json({ received: true });
//     }
// );

// export default app;

import express from 'express'
import Stripe from 'stripe';
import bodyParser from 'body-parser';

import Order from '../models/order.model.js'
import AdminMsg from '../models/adminMsg.model.js';
import Revenue from '../models/revenue.model.js'
import UserModel from '../models/user.model.js'
import productModel from '../models/product.model.js'


const app = express();
// Payment route
app.post("/makePayment", async (req, res) => {
    try {

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const { products, userId, address } = req.body;
        console.log(products)
        console.log("Payment request received:", {
            productsCount: products?.length,
            userId: userId?.substring(0, 5) + "..." // Log partial ID for privacy
        });

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid product data" });
        }

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Creating line items with validation
        const lineItems = products.map((product) => {
            console.log(`Processing product: ${product.name}, price: ${product.price}`);

            // Validate the price
            if (!product.price || isNaN(product.price) || product.price <= 0) {
                throw new Error(`Invalid price for product: ${product.name}`);
            }

            // Get a valid image URL or empty array
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
                        images: imageUrl.length > 0 ? imageUrl : ["https://example.com/default-image.png"] // Add fallback image URL here if needed
                    },
                    unit_amount: Math.round(product.price * 100),
                },
                quantity: product.quantity,
            };

        });

        console.log("Line items created successfully");

        // Create a minimal version of products for metadata
        const minimalProducts = products.map(p => ({
            id: p._id,
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            // Store image URLs in metadata for retrieval in webhook
            imageUrl: p.images && Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : "https://example.com/default-image.png"
        }));

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['AE'], // Customize this
            },
            line_items: lineItems,
            success_url: `${process.env.FRONT_END_URL}/payment/success`,
            cancel_url: `${process.env.FRONT_END_URL}/payment/cancel`,
            metadata: {
                userId: userId,
                products: JSON.stringify(minimalProducts),
                address: address || "",
            },
        });

        console.log("Payment session created successfully:", session.id);
        await UserModel.findByIdAndUpdate(
            userId,
            {
                $set: { orderStatus: ['pending'] },
                $set: { cart: [] }
            })
        res.json({ sessionId: session.id });

    } catch (error) {
        console.error("Payment Error:", error.message);
        console.error(error.stack);
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

                // Create a map of productId to imageUrl from products array
                const productImageMap = {};
                products.forEach(product => {
                    if (product.id && product.imageUrl) {
                        productImageMap[product.id] = product.imageUrl;
                    }
                });

                // ✅ Get line items
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
                    limit: 100,
                    expand: ['data.price.product'], // Expand to get product details including images
                });

                // Process line items to attach images
                const processedLineItems = await Promise.all(lineItems.data.map(async (item) => {
                    let imageUrl = "https://example.com/default-image.png";
                    
                    // Try to get the image from expanded product data
                    if (item.price?.product?.images && item.price.product.images.length > 0) {
                        imageUrl = item.price.product.images[0];
                    } else {
                        // Find matching product from metadata and use its image
                        const matchingProduct = products.find(p => 
                            item.description && p.name === item.description
                        );
                        if (matchingProduct && matchingProduct.imageUrl) {
                            imageUrl = matchingProduct.imageUrl;
                        }
                    }

                    return {
                        id: item.id,
                        description: item.description,
                        amount_subtotal: item.amount_subtotal,
                        amount_total: item.amount_total,
                        currency: item.currency,
                        quantity: item.quantity,
                        img: imageUrl, // Use the image URL we determined
                        price: {
                            id: item.price?.id,
                            unit_amount: item.price?.unit_amount,
                            currency: item.price?.currency,
                            product: item.price?.product?.id
                        }
                    };
                }));

                const order = new Order({
                    customer_email: session.customer_details?.email || null,
                    shipping: session.shipping || {},
                    billing_details: {
                        address: session.customer_details?.address || {},
                        email: session.customer_details?.email || null,
                        name: session.customer_details?.name || null,
                        phone: session.customer_details?.phone || null
                    },
                    line_items: processedLineItems,
                    amount_total: session.amount_total,
                    payment_status: session.payment_status,
                    payment_intent: session.payment_intent
                });

                console.log(order);

                let savedOrder;
                try {
                    // Save the order
                    savedOrder = await order.save();

                    // Update user's orders
                    await UserModel.findByIdAndUpdate(
                        metadata.userId,
                        {
                            $push: { orders: order._id },
                        }
                    );
                    console.log('✅ Order saved!', savedOrder._id);

                    // Update product stock for each product in the order
                    if (Array.isArray(products)) {
                        console.log("Products in webhook:", products);

                        // Process each product
                        for (const product of products) {
                            const productId = product.id; // FIX: Use 'id' instead of '_id'
                            const quantity = product.quantity || 1;

                            console.log(`Updating stock for product ID: ${productId}, quantity: ${quantity}`);

                            if (productId) {
                                // Decrement stock by purchased quantity
                                const updatedProduct = await productModel.findByIdAndUpdate(
                                    productId,
                                    { $inc: { stock: -quantity } },
                                    { new: true }
                                );

                                if (updatedProduct) {
                                    console.log(`✅ Updated stock for product ${productId}. New stock: ${updatedProduct.stock}`);

                                    // Check if stock is low
                                    if (updatedProduct.stock <= 5) {
                                        console.log(`⚠️ Low stock alert for product ${productId}: ${updatedProduct.stock} remaining`);
                                        // Add code here to notify admin about low stock
                                    }
                                } else {
                                    console.log(`❌ Product not found with ID: ${productId}`);
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('❌ Order save or stock update error:', error.message);
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