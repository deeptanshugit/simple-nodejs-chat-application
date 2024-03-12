const net = require('net');
const readline = require('readline');

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create a TCP socket for the client
const client = new net.Socket();

// Connect to the server on port 3000 and IP address 127.0.0.1
client.connect(3000, '127.0.0.1', () => {
  console.log('Connected to the server');
  // Prompt the user to enter a nickname
  rl.question('Enter your nickname: ', nickname => {
    // Send the chosen nickname to the server
    client.write(`/nick ${nickname}`);
    // Start the chat interaction
    startChat();
  });
});

// Function to handle user input and communication with the server
function startChat() {
  // Listen for user input
  rl.on('line', input => {
    if (input === '/exit') {
      // If the user enters "/exit," close the connection
      client.end();
    } else {
      // Send the user's message to the server
      client.write(input);
    }
  });

  // Listen for messages from the server
  client.on('data', data => {
    console.log(data.toString().trim());
  });

  // Listen for the connection end event
  client.on('end', () => {
    console.log('Disconnected from the server');
    // Exit the process when the connection is closed
    process.exit(0);
  });
}
