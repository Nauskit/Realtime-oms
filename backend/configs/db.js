const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('MongoDB Conneted!');
    } catch (err) {
        console.log(err);

    }
}

module.exports = connectDB;