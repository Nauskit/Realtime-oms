const express = require('express');
const connectDB = require('./configs/db')
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit')

const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
})

app.use(bodyParser.json());
app.use(cors());
app.use(limiter)

connectDB();

app.use('/users', authRoutes);


app.listen(3000, () => {
    console.log("running on port: 3000");
})