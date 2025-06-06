
// chat-app.js

// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Initialize Express app
const app = express();

// Create HTTP server using the Express app
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

/**
 * Socket.IO enables real-time, bidirectional communication.
 * It utilizes Node.js's non-blocking I/O and event-driven architecture to scale efficiently.
 */
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for chat messages and broadcast them to all connected clients
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Log when a user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // Optional: Log socket errors
  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

// Use environment variable for flexibility in deployment
const PORT = process.env.PORT || 3000;

// Start server and log any startup errors
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});
