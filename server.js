const net = require('net');
const { Worker, isMainThread, parentPort } = require('worker_threads');

// Array to store connected clients
const clients = [];

// Function to broadcast messages to all clients, excluding the sender
function broadcast(message, sender) {
  clients.forEach(client => {
    if (client !== sender) {
      client.write(`${sender.nickname}: ${message}`);
    }
  });
}

// Function to handle individual client connections
function handleClient(socket) {
  // Assign a default nickname to the client
  socket.nickname = `User${clients.length + 1}`;
  clients.push(socket);

  // Send a welcome message to the client
  socket.write(`Welcome, ${socket.nickname}!\n`);

  // Handle incoming messages from the client
  socket.on('data', data => {
    const message = data.toString().trim();
    if (message === '/exit') {
      // If the client sends "/exit," close the connection
      socket.end();
    } else {
      // Broadcast the message to all clients
      broadcast(message, socket);
    }
  });

  // Handle client disconnection
  socket.on('end', () => {
    // Remove the client from the array when they disconnect
    clients.splice(clients.indexOf(socket), 1);
    // Broadcast a message indicating that the client has left the chat
    broadcast(`${socket.nickname} has left the chat.`);
  });
}

// Check if the script is the main thread
if (isMainThread) {
  // Create a TCP server and handle client connections
  const server = net.createServer(handleClient);

  // Listen on port 3000
  server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
} else {
  // Display an error if the script is run as a worker thread
  console.error('This script should not be run as a worker thread.');
}
