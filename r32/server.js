// server.js
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

// In-memory representation of the Kanban board state
const boardState = {
  "item-1": "column-todo",
  "item-2": "column-todo",
  "item-3": "column-inprogress",
  "item-4": "column-done",
};

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send the current board state to the newly connected client
  ws.send(JSON.stringify({ type: "initialState", payload: boardState }));

  ws.on("message", (message) => {
    try {
      const { type, payload } = JSON.parse(message);

      if (type === "moveItem") {
        const { itemId, newZoneId } = payload;
        if (boardState[itemId]) {
          boardState[itemId] = newZoneId;
          // Broadcast the move to all connected clients (except the sender)
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  type: "itemMoved",
                  payload: { itemId, newZoneId },
                })
              );
            }
          });
        }
      }
    } catch (error) {
      console.error("Failed to parse message:", message, error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server started on ws://localhost:8080");
