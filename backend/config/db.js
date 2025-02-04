// const mongoose = require('mongoose');


// function connectDB() {

//     mongoose.connect(process.env.MONGO_URI).then(() => {
//         console.log('Database connected');
//     })
// }


// module.exports = connectDB;

import mongoose from 'mongoose';

export const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Database connected")
    })
}


