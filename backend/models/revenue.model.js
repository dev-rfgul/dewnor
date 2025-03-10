import mongoose from 'mongoose'
const revenueSchema = new mongoose.Schema({
    total: { type: Number, default: 0 }
});

const Revenue = mongoose.model('Revenue', revenueSchema);
export default Revenue;