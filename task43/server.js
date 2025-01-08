// server.js
const express = require("express");
const app = express();
const invitationRoutes = require("./routes/invitations");

app.use(express.json());
app.use("/invitations", invitationRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
