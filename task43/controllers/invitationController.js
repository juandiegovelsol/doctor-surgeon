// controllers/invitationController.js
let invitations = [];
let nextId = 1;

const createInvitation = (req, res) => {
  const {
    invitationName,
    adultQuantity,
    childrenQuantity = 0,
    guestNames,
    status,
  } = req.body;

  if (
    !invitationName ||
    adultQuantity === undefined ||
    guestNames === undefined ||
    !status
  ) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (typeof invitationName !== "string") {
    return res.status(400).json({ error: "Invitation name must be a string." });
  }

  if (!Number.isInteger(adultQuantity) || adultQuantity < 0) {
    return res
      .status(400)
      .json({ error: "Adult quantity must be a non-negative integer." });
  }

  if (!Number.isInteger(childrenQuantity) || childrenQuantity < 0) {
    return res
      .status(400)
      .json({ error: "Children quantity must be a non-negative integer." });
  }

  if (
    !Array.isArray(guestNames) ||
    guestNames.length !== adultQuantity + childrenQuantity
  ) {
    return res.status(400).json({
      error:
        "Guest names must be an array with a length equal to the total number of guests.",
    });
  }

  if (!guestNames.every((name) => typeof name === "string")) {
    return res.status(400).json({ error: "All guest names must be strings." });
  }

  if (status !== "pending") {
    return res.status(400).json({ error: 'Initial status must be "pending".' });
  }

  const newInvitation = {
    id: nextId++,
    invitationName,
    adultQuantity,
    childrenQuantity,
    guestNames,
    status,
  };

  invitations.push(newInvitation);
  res.status(201).json(newInvitation);
};

const getAllInvitations = (req, res) => {
  res.status(200).json(invitations);
};

module.exports = {
  createInvitation,
  getAllInvitations,
};
