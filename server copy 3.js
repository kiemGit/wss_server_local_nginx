const WebSocket = require('ws');

// Function to create a WebSocket server on a given port
const createWebSocketServer = (port) => {
    const wss = new WebSocket.Server({ port });

    wss.on('connection', (ws) => {
        console.log(`Client connected on port ${port}`);

        // Set up heartbeat
        ws.isAlive = true;

        ws.on('pong', () => {
            ws.isAlive = true; // Client responded
        });

        ws.on('message', (message) => {
            console.log(`Received on port ${port}:`, message);
            ws.send(`Server response from port ${port}: ${message}`);
        });

        ws.on('close', () => console.log(`Client disconnected from port ${port}`));
    });

    // Periodically check if clients are alive
    const interval = setInterval(() => {
        wss.clients.forEach((ws) => {
            if (!ws.isAlive) {
                console.log("Client unresponsive, terminating connection...");
                return ws.terminate(); // Close unresponsive connections
            }
            ws.isAlive = false;
            ws.ping(); // Send ping to check if client is alive
        });
    }, 30000); // Check every 30 seconds

    wss.on('close', () => {
        clearInterval(interval); // Clean up interval on server shutdown
    });

    console.log(`WebSocket server running on ws://localhost:${port}`);
};

// Define multiple ports
const ports = [8080, 8081, 8082];

// Start WebSocket servers on each port
ports.forEach(createWebSocketServer);
