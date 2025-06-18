const http = require('http')
const { Server } = require('socket.io')
const app = require('./app');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://realtime-oms.onrender.com'
    }
})

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