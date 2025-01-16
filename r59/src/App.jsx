import React from "react";
import { QuizProvider } from "./QuizContext";
import QuestionPage from "./QuestionPage";
import ReviewPage from "./ReviewPage";
import ResultPage from "./ResultPage";

function App() {
  return (
    <QuizProvider>
      <div>
        <h1>Quiz App</h1>
        <QuestionPage />
        <ReviewPage />
        <ResultPage />
      </div>
    </QuizProvider>
  );
}

export default App;
