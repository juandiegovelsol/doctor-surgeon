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
    code,
    phoneNumber,
  } = req.body;

  if (
    !invitationName ||
    adultQuantity === undefined ||
    guestNames === undefined ||
    !status ||
    !code ||
    !phoneNumber
  ) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (typeof invitationName !== "string") {
    return res.status(400).json({ error: "Invitation name must be a string." });
  }

  if (typeof code !== "string") {
    return res.status(400).json({ error: "Code must be a string." });
  }

  if (typeof phoneNumber !== "string") {
    return res.status(400).json({ error: "Phone number must be a string." });
  }

  const phoneRegex = /^\+\d{1,3}\d+$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({
      error:
        "Phone number must be in the format +CCNNNNNNNNNN where C is the country code and N is the phone number.",
    });
  }

  if (invitations.some((invitation) => invitation.code === code)) {
    return res.status(409).json({ error: "Code already exists." });
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
    code,
    invitationName,
    adultQuantity,
    childrenQuantity,
    guestNames,
    status,
    phoneNumber,
  };

  invitations.push(newInvitation);
  res.status(201).json(newInvitation);
};

const getAllInvitations = (req, res) => {
  res.status(200).json(invitations);
};

const modifyInvitation = (req, res) => {
  const { code } = req.params;
  const { invitationName, isAccepted } = req.body;

  if (!code || !invitationName || isAccepted === undefined) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (
    typeof code !== "string" ||
    typeof invitationName !== "string" ||
    typeof isAccepted !== "boolean"
  ) {
    return res.status(400).json({ error: "Invalid data types." });
  }

  const invitation = invitations.find(
    (inv) => inv.code === code && inv.invitationName === invitationName
  );

  if (!invitation) {
    return res
      .status(404)
      .json({ error: "Invitation not found with the provided code and name." });
  }

  if (isAccepted) {
    invitation.status = "accepted";
  } else {
    invitation.status = "rejected";
  }

  res.status(200).json(invitation);
};

const getWeddingSummary = (req, res) => {
  let totalInvitedGuests = 0;
  let acceptedGuestsCount = 0;
  let acceptedAdultsCount = 0;
  let acceptedChildrenCount = 0;
  const acceptedGuestNames = [];
  const rejectedGuestNames = [];
  const pendingGuestNames = [];

  invitations.forEach((invitation) => {
    totalInvitedGuests +=
      invitation.adultQuantity + invitation.childrenQuantity;
    if (invitation.status === "accepted") {
      acceptedGuestsCount +=
        invitation.adultQuantity + invitation.childrenQuantity;
      acceptedAdultsCount += invitation.adultQuantity;
      acceptedChildrenCount += invitation.childrenQuantity;
      acceptedGuestNames.push(...invitation.guestNames);
    } else if (invitation.status === "rejected") {
      rejectedGuestNames.push(...invitation.guestNames);
    } else {
      pendingGuestNames.push(...invitation.guestNames);
    }
  });

  const summary = {
    totalInvitedGuests,
    acceptedGuestsCount,
    acceptedAdultsCount,
    acceptedChildrenCount,
    acceptedGuestNames,
    rejectedGuestNames,
    pendingGuestNames,
  };

  res.status(200).json(summary);
};

module.exports = {
  createInvitation,
  getAllInvitations,
  modifyInvitation,
  getWeddingSummary,
};
