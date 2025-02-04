import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
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
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }

}, { timestamps: true })    

export const User = mongoose.model('User', UserSchema)