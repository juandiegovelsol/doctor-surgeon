// controllers/gradesController.js
let grades = [
  { id: 1, userId: 2, subject: "Math", grade: 85 },
  { id: 2, userId: 2, subject: "Science", grade: 92 },
];
let nextGradeId = 3;
const subjects = ["Math", "Science", "History", "English"];

// Import users array from userController (simple in-memory approach)
const userController = require("./userController");
const users = userController.users;

const createGrade = (req, res) => {
  const { userId, subject, grade } = req.body;

  if (
    !userId ||
    !subject ||
    grade === undefined ||
    typeof grade !== "number" ||
    !subjects.includes(subject)
  ) {
    return res.status(400).send({
      error:
        "UserId, subject, and grade are required. Subject must be one of: \\(subjects.join(', ')\\)",
    });
  }

  const userExists = users.some((user) => user.id === userId);
  if (!userExists) {
    return res.status(404).send({ error: "User not found." });
  }

  const newGrade = { id: nextGradeId++, userId, subject, grade };
  grades.push(newGrade);
  res.status(201).send(newGrade);
};

const getAllGradesWithUsers = (req, res) => {
  const gradesWithUsers = grades.map((grade) => {
    const user = users.find((user) => user.id === grade.userId);
    return {
      gradeId: grade.id,
      subject: grade.subject,
      grade: grade.grade,
      user: user
        ? {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
          }
        : null,
    };
  });
  res.status(200).send(gradesWithUsers);
};

module.exports = {
  createGrade,
  getAllGradesWithUsers,
};
