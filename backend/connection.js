const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.MONGODB_URI;

async function connectDB(){
    try {
        await mongoose.connect(URI);
        console.log("DB connected successfully");
    } 
    catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;