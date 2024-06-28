const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: 'http://localhost:4200', // Allow only this origin
  methods: ['GET', 'POST'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));

let peers = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  peers[socket.id] = socket.id;

  // Send the list of current peers to the newly connected client
  socket.emit('existingPeers', Object.keys(peers));

  // Notify existing clients about the new peer
  socket.broadcast.emit('newPeer', socket.id);

  socket.on('offer', (offer) => {
    socket.to(offer.peerId).emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    socket.to(answer.peerId).emit('answer', answer);
  });

  socket.on('candidate', (candidate) => {
    socket.to(candidate.peerId).emit('candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete peers[socket.id];
    socket.broadcast.emit('peer-leave', socket.id);
  });

  socket.on('toggle-mute', (peerId) => {
    socket.broadcast.emit('toggle-mute', peerId);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
