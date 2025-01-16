import React, { useContext, useEffect } from "react";
import QuizContext from "./QuizContext";

const ResultPage = () => {
  const { score, calculateScore, questions } = useContext(QuizContext);

  useEffect(() => {
    calculateScore(); // Calculate score when ResultPage mounts
  }, [calculateScore]);

  return (
    <div>
      <h2>Quiz Result</h2>
      <p>
        Your Score: {score} out of {questions.length}
      </p>
    </div>
  );
};

export default ResultPage;
