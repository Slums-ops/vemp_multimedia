const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let gameState = null;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Client connected');

    if (gameState) {
        socket.emit('updateState', gameState);
    }

    socket.on('updateState', (newState) => {
        gameState = newState;
        socket.broadcast.emit('updateState', newState);
    });

    socket.on('requestState', () => {
        if (gameState) {
            socket.emit('initialState', gameState);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));