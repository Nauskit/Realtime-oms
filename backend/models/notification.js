const mongoose = require('mongoose');

const notiSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ['order', 'promotion', 'system'],
        default: 'system',
    },
    createAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('notification', notiSchema);