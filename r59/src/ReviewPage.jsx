import React, { useContext } from "react";
import QuizContext from "./QuizContext";

const ReviewPage = () => {
  const { questions, userAnswers } = useContext(QuizContext);

  return (
    <div>
      <h2>Review Your Answers</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <p>
              <strong>Question:</strong> {question.question}
            </p>
            <p>
              <strong>Your Answer:</strong>{" "}
              {userAnswers[question.id] || "Not answered"}
            </p>
            <p>
              <strong>Correct Answer:</strong> {question.correctAnswer}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewPage;
