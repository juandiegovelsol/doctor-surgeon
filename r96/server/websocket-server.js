// backend/websocket-server.js
const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on("connection", (ws) => {
  console.log("Client connected");
  clients.add(ws);

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    clients.delete(ws);
  });
});

// Simulate fetching new activity data periodically
setInterval(() => {
  const newActivityData = {
    userId: "user123",
    steps: Math.floor(Math.random() * 100),
    timestamp: new Date().toISOString(),
  };

  // Broadcast the new data to all connected clients
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(newActivityData));
    }
  });
}, 5000); // Send updates every 5 seconds

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});
