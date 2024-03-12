Simple Node.js Chat Application

This is a simple chat application implemented in Node.js using sockets. The server supports multiple client connections, allowing users to send and receive messages in a shared chatroom environment.

Getting Started:

Prerequisites:

- Make sure you have Node.js installed on your machine.

Installation:

1. Clone the repository:

   git clone https://github.com/your-username/nodejs-chat-app.git

2. Navigate to the project directory:

   cd nodejs-chat-app

3. Install dependencies:

   npm install

How to Use:

Server:

1. Start the server:

   node server.js

   The server will start listening on port 3000.

Client:

1. Open a new terminal window and run the client:

   node client.js

2. Enter your desired nickname when prompted.

3. Start chatting with other connected clients.

Commands:

- To send a message, simply type it and press Enter.
- To exit the chat, type /exit and press Enter.

Technical Details:

- The server uses Node.js with the net module for handling socket connections.
- Client-server communication is achieved using simple text-based messages.
- Multiple clients can connect to the server simultaneously, and messages are broadcasted to all connected clients.
