// Example Node.js backend using ws (very simplified)
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 }); // Choose a port

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    // Handle messages from clients if needed (e.g., for sending updates initiated by this client)
    console.log("received message:", message);
  });

  // Example: Simulate task updates (replace with actual DB events)
  setInterval(() => {
    const randomTaskUpdate = {
      type: "TASK_UPDATED",
      payload: {
        id: "task2",
        status: "Review",
        description: "Updated description via websocket!",
      }, // Example update
    };
    ws.send(JSON.stringify(randomTaskUpdate));
  }, 5000); // Send a simulated update every 5 seconds

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket server error:", error);
  });
});

console.log("WebSocket server started on port 8080");
