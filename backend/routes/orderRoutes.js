const express = require("express");
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken')
const router = express.Router();


router.post('/', verifyToken, orderController.createOrder);
router.put('/:orderId/status', verifyToken, orderController.updateOrderStatus);


module.exports = router;