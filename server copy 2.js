const WebSocket = require('ws');

// Function to create a WebSocket server on a given port
const createWebSocketServer = (port) => {
    const wss = new WebSocket.Server({ port });

    wss.on('connection', (ws) => {
        console.log(`Client connected on port ${port}`);

        ws.on('message', (message) => {
            console.log(`Received on port ${port}:`, message);
            ws.send(`Server response from port ${port}: ${message}`);
        });

        ws.on('close', () => console.log(`Client disconnected from port ${port}`));
    });

    console.log(`WebSocket server running on ws://localhost:${port}`);
};

// Define multiple ports
const ports = [8080, 8081, 8082];

// Start WebSocket servers on each port
ports.forEach(createWebSocketServer);
