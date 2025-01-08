// server.js
const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors middleware
const invitationRoutes = require("./routes/invitations");

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use("/api/invitations", invitationRoutes); // Add the /api prefix

const PORT = 3001; // Change the port to avoid conflicts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
