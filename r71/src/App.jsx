import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Dashboard from "./Dashboard";
import FeedbackForm from "./FeedbackForm";

function App() {
  return (
    <>
      <Dashboard />
      <FeedbackForm />
    </>
  );
}

export default App;
