const WebSocket = require('ws');

// Create WebSocket server (listens on port 8080)
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received:', message);
        ws.send(`Server response: ${message}`);
    });

    ws.on('close', () => console.log('Client disconnected'));
});

console.log("WebSocket server running on ws://localhost:8080");
