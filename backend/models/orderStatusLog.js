const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    status: {
        type: String,
        required: true
    },
    changedAt: {
        type: Date,
        default: Date.now
    },
    changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('OrderStatusLog', orderStatusSchema);