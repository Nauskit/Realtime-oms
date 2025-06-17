const Order = require('../models/order')
const User = require('../models/user');

exports.getUserWithOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const order = await Order.find({ userId }).sort({ creatgeAt: -1 }).populate('userId', 'username email');

        if (!order.length) {
            return res.status(404).json({ message: "Order not found!" })
        }

        return res.status(200).json({ order });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Feiled", error: err.message })
    }
}

exports.getUserDashBoard = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to get users" })
    }
}