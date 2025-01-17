// script.js

document.addEventListener("DOMContentLoaded", function () {
  const kitchenContainer = document.getElementById("kitchen-container");
  const launchQuizButton = document.getElementById("launch-quiz-button");
  const quizContainer = document.getElementById("quiz-container");
  const quizQuestionsDiv = document.getElementById("quiz-questions");
  const submitQuizButton = document.getElementById("submit-quiz-button");
  const quizResultsDiv = document.getElementById("quiz-results");

  const oven = document.getElementById("oven");
  const hob = document.getElementById("hob");
  const microwave = document.getElementById("microwave");
  const fridge = document.getElementById("fridge");
  const sink = document.getElementById("sink");
  const choppingBoard = document.getElementById("chopping-board");
  const knife = document.getElementById("knife");

  // --- Kitchen Item Pop-up Information (same as before) ---
  oven.addEventListener("click", function () {
    alert(
      "Oven Safety:\n- Always use oven gloves when handling hot items.\n- Never leave the oven unattended when in use.\n- Keep flammable materials away from the oven."
    );
  });

  hob.addEventListener("click", function () {
    alert(
      "Hob Safety:\n- Never leave pans unattended on the hob.\n- Turn pan handles inwards to prevent accidents.\n- Be aware of hot surfaces."
    );
  });

  microwave.addEventListener("click", function () {
    alert(
      "Microwave Safety:\n- Never put metal in the microwave.\n- Use microwave-safe containers.\n- Be careful of steam when opening."
    );
  });

  fridge.addEventListener("click", function () {
    alert(
      "Fridge Safety:\n- Keep the fridge at the correct temperature.\n- Store food properly to avoid contamination.\n- Check use-by dates."
    );
  });

  sink.addEventListener("click", function () {
    alert(
      "Sink Safety:\n- Wash hands thoroughly before and after food preparation.\n- Be careful with hot water.\n- Keep cleaning products stored safely."
    );
  });

  choppingBoard.addEventListener("click", function () {
    alert(
      "Chopping Board Safety:\n- Use separate chopping boards for raw and cooked foods.\n- Clean chopping boards thoroughly after use.\n- Use a stable surface."
    );
  });

  knife.addEventListener("click", function () {
    alert(
      "Knife Safety:\n- Always cut away from yourself.\n- Use a chopping board when cutting.\n- Store knives safely when not in use."
    );
  });

  // --- Quiz Functionality ---

  launchQuizButton.addEventListener("click", function () {
    kitchenContainer.style.display = "none"; // Hide kitchen simulation
    launchQuizButton.style.display = "none"; // Hide Launch Quiz button itself
    quizContainer.style.display = "block"; // Show quiz container
  });

  const quizQuestions = [
    {
      question:
        "What should you always use when handling hot items from the oven?",
      options: ["Tea towels", "Oven gloves", "Plastic bags", "Bare hands"],
      correctAnswer: "Oven gloves",
    },
    {
      question: "Why should you turn pan handles inwards on the hob?",
      options: [
        "To cook food evenly",
        "To save space",
        "To prevent accidents",
        "It looks tidier",
      ],
      correctAnswer: "To prevent accidents",
    },
    {
      question: "What should you NEVER put in the microwave?",
      options: [
        "Glass containers",
        "Metal objects",
        "Ceramic plates",
        "Plastic wrap",
      ],
      correctAnswer: "Metal objects",
    },
    {
      question: "What is important to check on food in the fridge?",
      options: ["Colour", "Smell", "Use-by dates", "Price"],
      correctAnswer: "Use-by dates",
    },
    {
      question: "When using a knife, which direction should you always cut?",
      options: [
        "Towards yourself",
        "Away from yourself",
        "Sideways",
        "Upwards",
      ],
      correctAnswer: "Away from yourself",
    },
  ];

  function buildQuiz() {
    quizQuestions.forEach((questionData, questionIndex) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");

      const questionText = document.createElement("p");
      questionText.textContent = `Question ${questionIndex + 1}: ${
        questionData.question
      }`;
      questionDiv.appendChild(questionText);

      questionData.options.forEach((option) => {
        const answerOptionDiv = document.createElement("div");
        answerOptionDiv.classList.add("answer-option");

        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = `q${questionIndex}`; // Unique name for each question's radio buttons
        radioInput.value = option;
        radioInput.id = `q${questionIndex}-${option
          .replace(/\s+/g, "-")
          .toLowerCase()}`; // Unique ID

        const label = document.createElement("label");
        label.textContent = option;
        label.htmlFor = `q${questionIndex}-${option
          .replace(/\s+/g, "-")
          .toLowerCase()}`; // Link label to input

        answerOptionDiv.appendChild(radioInput);
        answerOptionDiv.appendChild(label);
        questionDiv.appendChild(answerOptionDiv);
      });

      quizQuestionsDiv.appendChild(questionDiv);
    });
  }

  buildQuiz(); // Call the function to generate the quiz questions when page loads

  submitQuizButton.addEventListener("click", function () {
    let score = 0;
    quizQuestions.forEach((questionData, questionIndex) => {
      const selectedOption = document.querySelector(
        `input[name="q${questionIndex}"]:checked`
      );
      if (
        selectedOption &&
        selectedOption.value === questionData.correctAnswer
      ) {
        score++;
      }
    });

    quizResultsDiv.textContent = `You scored ${score} out of ${quizQuestions.length} questions.`;
    quizResultsDiv.style.display = "block"; // Make sure results are visible
  });
});
