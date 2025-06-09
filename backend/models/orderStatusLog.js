const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
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
    changeBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('orderStatusLog', orderStatusSchema);