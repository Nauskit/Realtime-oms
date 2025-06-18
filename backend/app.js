const express = require('express');
const connectDB = require('./configs/db')
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const dashBoardRoutes = require('./routes/dashBoardRoutes');
const bodyParser = require('body-parser');
const checkRole = require('../middleware/checkRole');
const verifyToken = require('../middleware/verifyToken');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use('/users', authRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/dashboard', verifyToken, checkRole('admin'), dashBoardRoutes);


module.exports = app;