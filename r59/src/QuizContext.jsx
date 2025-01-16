import React, { createContext, useState, useEffect } from "react";

const QuizContext = createContext();
const LOCAL_STORAGE_KEY = "quizAppState"; // Key for local storage

export const QuizProvider = ({ children }) => {
  // Function to get initial state from local storage or default
  const getInitialState = () => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedState) {
      return JSON.parse(storedState);
    } else {
      return {
        questions: [
          // Example questions (replace with your actual quiz questions)
          {
            id: 1,
            question: "What is the capital of France?",
            options: ["London", "Paris", "Berlin", "Rome"],
            correctAnswer: "Paris",
          },
          {
            id: 2,
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            correctAnswer: "Mars",
          },
          // ... more questions
        ],
        userAnswers: {},
        score: 0,
        currentQuestionIndex: 0,
      };
    }
  };

  const initialState = getInitialState();
  const [questions, setQuestions] = useState(initialState.questions);
  const [userAnswers, setUserAnswers] = useState(initialState.userAnswers);
  const [score, setScore] = useState(initialState.score);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    initialState.currentQuestionIndex
  );

  useEffect(() => {
    // Update local storage whenever state changes
    const stateToStore = {
      questions, // Optionally persist questions as well, if they are static
      userAnswers,
      score,
      currentQuestionIndex,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToStore));
  }, [questions, userAnswers, score, currentQuestionIndex]); // Effect dependencies

  const answerQuestion = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const calculateScore = () => {
    let correctAnswersCount = 0;
    questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctAnswersCount++;
      }
    });
    setScore(correctAnswersCount);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setScore(0);
    setCurrentQuestionIndex(0);
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Optionally clear local storage on reset
  };

  const value = {
    questions,
    userAnswers,
    score,
    currentQuestionIndex,
    answerQuestion,
    calculateScore,
    nextQuestion,
    previousQuestion,
    resetQuiz,
    setQuestions, // Optionally expose setQuestions if you need to load questions dynamically
    setCurrentQuestionIndex, // Optionally expose if needed
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export default QuizContext;
