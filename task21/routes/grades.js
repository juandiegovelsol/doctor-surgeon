// routes/grades.js
const express = require("express");
const gradesController = require("../controllers/gradesController");

const router = express.Router();

router.post("/", gradesController.createGrade);
router.get("/", gradesController.getAllGradesWithUsers);

module.exports = router;
