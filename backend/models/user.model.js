import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }],

}, { timestamps: true })

const User = mongoose.model('User', UserSchema)
export default User;