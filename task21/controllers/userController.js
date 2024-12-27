// controllers/userController.js
let users = [
  {
    id: 1,
    username: "admin",
    password: "adminpassword",
    email: "admin@example.com",
    name: "Admin User",
    permission: true,
  },
  {
    id: 2,
    username: "user1",
    password: "user1password",
    email: "user1@example.com",
    name: "Test User 1",
    permission: false,
  },
];
let nextId = 3;

const createUser = (req, res) => {
  const { username, password, email, name, permission } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    !name ||
    typeof permission !== "boolean"
  ) {
    return res.status(400).send({
      error: "All fields except ID are required and must have valid values.",
    });
  }
  const newUser = { id: nextId++, username, password, email, name, permission };
  users.push(newUser);
  res.status(201).send(newUser);
};

const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  res.status(200).send(user);
};

const getAllUsers = (req, res) => {
  const requesterId = parseInt(req.headers["requester-id"]);
  if (isNaN(requesterId)) {
    return res
      .status(400)
      .send({ error: "Requester ID is required in the header." });
  }
  const requester = users.find((u) => u.id === requesterId);
  if (!requester) {
    return res.status(404).send({ error: "Requester not found." });
  }
  if (!requester.permission) {
    return res
      .status(403)
      .send({ error: "Not allowed. Insufficient permissions." });
  }
  res.status(200).send(users);
};

module.exports = {
  users, // Export the users array
  createUser,
  getUserById,
  getAllUsers,
};
