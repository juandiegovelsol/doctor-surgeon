import React, { useContext } from "react";
import QuizContext from "./QuizContext";

const QuestionPage = () => {
  const { questions, currentQuestionIndex, answerQuestion, nextQuestion } =
    useContext(QuizContext);

  if (!questions || questions.length === 0) {
    return <p>No questions available.</p>; // Handle case where questions are not loaded yet
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelection = (selectedAnswer) => {
    answerQuestion(currentQuestion.id, selectedAnswer);
  };

  const goToNextQuestion = () => {
    nextQuestion();
  };

  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion.question}</p>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleAnswerSelection(option)}>
              {option}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={goToNextQuestion}
        disabled={currentQuestionIndex >= questions.length - 1}
      >
        Next Question
      </button>
    </div>
  );
};

export default QuestionPage;
