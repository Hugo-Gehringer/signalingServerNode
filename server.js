const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const {Server} = require("socket.io");

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

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('offer', (offer) => {
    // console.log("offer", offer)
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    // console.log("answer", answer)
    socket.broadcast.emit('answer', answer);
  });

  socket.on('candidate', (candidate) => {
    socket.broadcast.emit('candidate', candidate);
  });

  socket.on('disconnect', (payload) => {
    console.log('user disconnected');
    socket.broadcast.emit('peer-leave', socket.id);
  });

  socket.on('peer-leave', (payload) => {
    socket.broadcast.emit('peer-leave', payload);
  });

  socket.on('offer', (offer) => {
    // console.log("offer", offer)
    socket.broadcast.emit('offer', offer); // Sends the 'offer' to all other connected clients
  });
  socket.on('toggle-mute', (offer) => {
    // console.log("offer", offer)
    socket.broadcast.emit('offer', offer); // Sends the 'offer' to all other connected clients
  });
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
