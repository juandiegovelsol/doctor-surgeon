/* script.js */

// 1. Data for Fill-in-the-Blanks Questions (Array of Objects)
const gameQuestions = [
  {
    text: "The cat sat on the <blank>.", // Question text with "<blank>" placeholders
    blanks: ["mat"], // Array of correct answers for each blank in order
  },
  {
    text: "She <blank> to the park <blank> day.",
    blanks: ["walked", "yesterday"],
  },
  // --- ADD NEW QUESTIONS HERE ---
  // Example of how to add another question:
  /*
    {
        text: "Another sentence with a <blank> and another <blank>.",
        blanks: ["word1", "word2"], // Correct answers in order of blanks in the text
    },
    */
  // --- END OF SECTION TO ADD NEW QUESTIONS ---
];

// 2. DOM Elements Selection
const questionTextElement = document.getElementById("question-text");
const feedbackContainer = document.getElementById("feedback-container");
const feedbackMessageElement = document.getElementById("feedback-message");
const resultContainer = document.getElementById("result-container");
const resultMessageElement = document.getElementById("result-message");
const scoreElement = document.getElementById("score");
const totalBlanksElement = document.getElementById("total-blanks");
const restartButton = document.getElementById("restart-button");

// 3. DOM Element for the Check Button
const checkButton = document.getElementById("check-button"); // Get the Check Answers button element

let currentQuestionIndex = 0;
let score = 0;
let blankSpans = []; // Array to store the blank <span> elements

// 4. Function to Load a Question (Modified - no 'blur' event handling in loadQuestion anymore)
function loadQuestion() {
  const currentQuestionData = gameQuestions[currentQuestionIndex];
  const questionText = currentQuestionData.text;
  const blanks = currentQuestionData.blanks;

  questionTextElement.innerHTML = ""; // Clear previous question text
  blankSpans = []; // Reset blank spans array

  let blankIndex = 0; // To track which blank we are currently processing

  // Split the question text by "<blank>" to create parts and blanks
  const parts = questionText.split("<blank>");

  parts.forEach((part, index) => {
    questionTextElement.innerHTML += part; // Add the text part

    if (index < parts.length - 1) {
      // If it's not the last part, it means there should be a blank after it
      const blankSpan = document.createElement("span");
      blankSpan.classList.add("blank");
      blankSpan.contentEditable = "true"; // Make the span editable (simulating input)
      blankSpan.dataset.blankIndex = blankIndex; // Store the blank index
      // REMOVED: blankSpan.addEventListener('blur', checkAnswer); // No more blur event, check on button click

      questionTextElement.appendChild(blankSpan);
      blankSpans.push(blankSpan); // Add to the array to easily access them later
      blankIndex++;
    }
  });

  feedbackContainer.style.display = "none"; // Hide feedback initially for each question
}

// 5. NEW FUNCTION: Function to Check Answers when "Check Answers" button is clicked
function checkAnswers() {
  let allCorrect = true; // Assume all are correct initially, and set to false if any are incorrect
  feedbackContainer.style.display = "block"; // Show feedback container

  let feedbackMessages = []; // Array to collect feedback messages for each blank (if needed, or just overall)

  for (let i = 0; i < blankSpans.length; i++) {
    const blankSpan = blankSpans[i];
    const userAnswer = blankSpan.textContent.trim().toLowerCase();
    const correctAnswer =
      gameQuestions[currentQuestionIndex].blanks[i].toLowerCase();

    if (userAnswer === correctAnswer) {
      blankSpan.classList.remove("incorrect"); // Remove incorrect class if it was there from a previous check
      blankSpan.classList.add("correct");
      blankSpan.contentEditable = "false"; // Make non-editable after correct answer
      // feedbackMessages.push(`Blank ${i+1}: Correct!`); // Optional individual feedback
    } else {
      blankSpan.classList.remove("correct"); // Remove correct class if it was there from a previous check
      blankSpan.classList.add("incorrect");
      allCorrect = false; // Mark that not all answers are correct
      // feedbackMessages.push(`Blank ${i+1}: Incorrect. The correct answer is "${gameQuestions[currentQuestionIndex].blanks[i]}".`); // Optional detailed feedback
    }
  }

  if (allCorrect) {
    feedbackMessageElement.textContent = "Excellent! All answers are correct!"; // Overall success message
    score += gameQuestions[currentQuestionIndex].blanks.length; // Award score for all blanks in this question (or you could award per question)
    // Move to the next question after a delay
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < gameQuestions.length) {
        loadQuestion();
      } else {
        showResults();
      }
    }, 1500);
  } else {
    feedbackMessageElement.textContent =
      "Some answers are incorrect. Please review and try again."; // Overall try again message
    // If you want to show detailed feedback per blank (using feedbackMessages array):
    // feedbackMessageElement.textContent = feedbackMessages.join("\n"); // Join messages with line breaks
  }
}

// REMOVED: Function checkAnswer(e) - No longer needed with button click checking.  Functionality moved to checkAnswers()

// 6. Function areAllBlanksCorrect() -  This function is no longer directly used for progression within `checkAnswers()`, but it's still potentially useful for other logic if you expand the game.  Keeping it for now.
// function areAllBlanksCorrect() { ... }

// 7. Function showResults() - No change needed
// function showResults() { ... }

// 8. Function calculateTotalBlanks() - No change needed
// function calculateTotalBlanks() { ... }

// 9. Restart Game Functionality - No change needed
restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.style.display = "none";
  questionContainer.style.display = "block"; // Ensure question container is shown again
  feedbackContainer.style.display = "none"; // Hide feedback container at restart
  loadQuestion();
});

// 10. Event Listener for the "Check Answers" Button
checkButton.addEventListener("click", checkAnswers); // Call checkAnswers function when button is clicked

// 11. Initial Game Load
loadQuestion();
