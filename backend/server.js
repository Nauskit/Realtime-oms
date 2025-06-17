const express = require('express');
const connectDB = require('./configs/db')
const http = require('http')
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const dashBoardRoutes = require('./routes/dashBoardRoutes');
const bodyParser = require('body-parser');
const { Server } = require('socket.io')
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use('/users', authRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/dashboard', dashBoardRoutes);

app.set('io', io);

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
    socket.on('disconnect', (reason) => {
        console.log('User disconnected', socket.id, 'Reason:', reason)
    })
})

server.listen(3000, () => {
    console.log("running on port: 3000");
})