const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', socket => {
    socket.on('panic-alert', location => {
        // Emit the location data to all connected sockets
        io.emit('location-update', location);
        console.log('Panic alert received:', location);
        // Handle alert and dispatch emergency services (not implemented)
    });
});

const PORT = process.env.PORT || 4000;
const localIP = '192.168.29.83'; // Replace with your actual local IP address
server.listen(PORT, localIP, () => {
  console.log(`Server is running on http://${localIP}:${PORT}`);
});
