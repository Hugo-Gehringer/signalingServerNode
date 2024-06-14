const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust as necessary for your deployment
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: 'http://localhost:4200', // Allow only this origin
  methods: ['GET', 'POST'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('offer', ({ offer, peerId }) => {
    console.log("Received offer from", socket.id, "for peer", peerId);
    socket.to(peerId).emit('offer', { offer, peerId: socket.id });
  });

  socket.on('answer', ({ answer, peerId }) => {
    console.log("Received answer from", socket.id, "for peer", peerId);
    socket.to(peerId).emit('answer', { answer, peerId: socket.id });
  });

  socket.on('candidate', ({ candidate, peerId }) => {
    console.log("Received candidate from", socket.id, "for peer", peerId);
    socket.to(peerId).emit('candidate', { candidate, peerId: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    socket.broadcast.emit('peer-leave', { peerId: socket.id });
  });

  socket.on('peer-leave', (payload) => {
    console.log('Peer leaving', payload.peerId);
    socket.broadcast.emit('peer-leave', payload);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
