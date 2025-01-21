// backend/sse-server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const clients = [];

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders(); // Send headers immediately

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  clients.push(newClient);

  req.on("close", () => {
    clients = clients.filter((client) => client.id !== clientId);
    console.log(`Client ${clientId} disconnected`);
  });

  console.log(`Client ${clientId} connected`);
});

// Simulate sending new activity data periodically
setInterval(() => {
  const activityData = {
    userId: "user456",
    heartRate: Math.floor(Math.random() * 30) + 60,
    timestamp: new Date().toISOString(),
  };

  clients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify(activityData)}\n\n`);
  });
}, 3000); // Send updates every 3 seconds

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`SSE server listening on port ${PORT}`);
});
