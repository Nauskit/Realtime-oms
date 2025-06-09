const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('product', productSchema)