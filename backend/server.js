const express = require('express');
const connectDB = require('./configs/db')
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use('/users', authRoutes);


app.listen(3000, () => {
    console.log("running on port: 3000");
})