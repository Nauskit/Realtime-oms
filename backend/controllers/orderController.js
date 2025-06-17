const mongoose = require('mongoose');
const Order = require('../models/order');
const OrderStatusLog = require('../models/orderStatusLog');
const Product = require('../models/product');




exports.createOrder = async (req, res) => {
    const { userId, items, totalAmount } = req.body;

    if (!userId || !items || !totalAmount) {
        return res.status(400).json({ message: "All fields are required!!" })
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        for (const item of items) {
            const product = await Product.findById(item.product)
            if (!product) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ message: "Product not found!" })
            }

            if (product.stock < item.quantity) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ message: `Product : ${product.productName} does not have enough stock` })
            }
        }

        for (const item of items) {
            await Product.findByIdAndUpdate(item.product, { $inc: { stock: - item.quantity } })
        }




        const newOrder = new Order({
            userId: req.user.id,
            items,
            totalAmount
        });

        await newOrder.save({ session });

        await session.commitTransaction();
        session.endSession();

    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: "Server Feiled", error: err.message })
    }
}

exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    if (!status) {
        return res.status(400).json({ message: "Status is required!" })
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: "invalid orderId" })
    }

    try {

        const order = await Order.findById(orderId).populate('items.product', 'productName description status');
        if (!order) {
            return res.status(404).json({ message: "Order not found!" })
        }

        order.status = status;
        await order.save();

        const log = new OrderStatusLog({
            orderId,
            status,
            changedBy: userId
        })

        await log.save();
        const io = req.app.get('io');
        io.emit('orderStatusUpdate', order)

        return res.status(200).json({ message: "Order status update", order, log })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error", error: err.message })
    }
}


exports.getUserOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const getOrder = await Order.find({ userId }).sort({ createAt: -1 }).populate('items.product', 'productName status description')
            .populate('userId', 'username');
        if (!getOrder.length) {
            return res.status(404).json({ message: "No orders found!" })
        }

        return res.status(200).json({ getOrder });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error", error: err.message })
    }
}


exports.getOrderById = async (req, res) => {
    try {
        const { userId } = req.params;
        const getOrder = await Order.find({ userId })
            .sort({ createAt: -1 })
            .populate('items.product', 'productName status description')
            .populate('userId', 'username');
        return res.json({ getOrder })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to get orders', error: err.message })

    }
}