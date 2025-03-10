import express from 'express'


import Revenue from '../models/revenue.model.js'
import Order from '../models/order.model.js'



const app = express()



app.get('/test', (req, res) => {


})


app.get('/total-revenue', async (req, res) => {
    try {
        const revenueDoc = await Revenue.findOne(); // assuming there's only one document
        if (!revenueDoc) {
            return res.status(404).json({ message: 'Revenue data not found' });
        }

        res.status(200).json({ message: "fetched revenue successfully", totalRevenue: revenueDoc.total });
    } catch (error) {
        console.error('Failed to fetch revenue:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/total-orders', async (req, res) => {
    try {
        const orders = await Order.find({});
        if (!orders || orders.length == 0) {
            return res.status(404).json({ message: "No orders found" })
        }
        res.status(200).json({ message: "Found orders successfully", orders: orders })
    }
    catch (error) {
        console.error('Failed to fetch revenue:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

export default app;