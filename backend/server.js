const express = require('express');
const connectDB = require('./configs/db')
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use('/users', authRoutes);
app.use('/dashboard', authRoutes);
app.use('/orders', orderRoutes);
app.use('/product', productRoutes);

app.listen(3000, () => {
    console.log("running on port: 3000");
})