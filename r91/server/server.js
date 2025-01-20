const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 }); // Listen on port 8080
const clients = new Set(); // Keep track of connected clients

wss.on("connection", (ws) => {
  console.log("Client connected");
  clients.add(ws);

  ws.on("message", (message) => {
    // Basic message parsing and broadcast
    try {
      const drawData = JSON.parse(message);
      if (drawData && drawData.type === "draw") {
        // Broadcast to all connected clients *except* the sender (optional, but common in collaborative apps)
        clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            // Ensure client is open before sending
            client.send(message); // Re-broadcast the message
          }
        });
      } else {
        console.warn("Received malformed message:", message);
      }
    } catch (e) {
      console.error("Error parsing message:", e);
      console.warn("Malformed message:", message);
      // Optionally send an error message back to the client
      // ws.send(JSON.stringify({ type: 'error', message: 'Malformed message received' }));
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    clients.delete(ws); // Remove client on error
  });

  // Send a welcome message or initial state if needed
  // ws.send(JSON.stringify({ type: 'welcome', message: 'Welcome to the collaborative drawing!' }));
});

wss.on("listening", () => {
  console.log("WebSocket server listening on port 8080");
});

wss.on("error", (error) => {
  console.error("Server error:", error);
});

console.log("Starting WebSocket server...");
