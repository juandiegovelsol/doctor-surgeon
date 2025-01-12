// App.jsx
import React from "react";
import MessageSlider from "./MessageSlider";

const messages = [
  "Welcome! Let's explore amazing features.",
  "Discover new possibilities with our platform.",
  "Get started and enjoy the experience!",
  "This is a sample message for demonstration.",
  "Infinite loop of messages is active.",
  "Shorter message.",
  "A bit longer message to test container size.",
];

function App() {
  return (
    <div>
      <h1>Introductory Messages</h1>
      <MessageSlider messages={messages} />
    </div>
  );
}

export default App;
