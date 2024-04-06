const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

let uri = "mongodb://127.0.0.1:27017/UsedCars";

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log("Database connected successfully");
         return conn;
    } catch (err) {
         console.error("Database Connection Failed:", err);
        throw err;
    }
};

module.exports = dbConnect;
