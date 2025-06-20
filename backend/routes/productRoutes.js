const express = require("express");
const productController = require('../controllers/productController')
const router = express.Router();


router.post('/create', productController.createProduct);
router.get('/', productController.getAllProduct);

module.exports = router;