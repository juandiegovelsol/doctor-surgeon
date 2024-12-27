// index.js
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const gradesRoutes = require("./routes/grades"); // Import grades routes

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/grades", gradesRoutes); // Use grades routes

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
