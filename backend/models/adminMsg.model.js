import mongoose from 'mongoose'
const adminMessageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    createdAt: { type: Date, default: Date.now },
});

const AdminMsg = mongoose.model('AdminMsg', adminMessageSchema);
export default AdminMsg;