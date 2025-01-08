// routes/invitations.js
const express = require("express");
const router = express.Router();
const invitationController = require("../controllers/invitationController");

router.post("/", invitationController.createInvitation);
router.get("/", invitationController.getAllInvitations);
router.put("/:code", invitationController.modifyInvitation);
router.get("/summary", invitationController.getWeddingSummary);

module.exports = router;
