const express = require('express');
const connectDB = require('./configs/db')
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const dashBoardRoutes = require('./routes/dashBoardRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use('/users', authRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/dashboard', dashBoardRoutes);


module.exports = app;