// AnswerForm.js
import React, { useState } from "react";

const AnswerForm = ({ websocket }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify({ type: "submit_answer", answer }));
      setAnswer("");
    } else {
      console.error("WebSocket is not open.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your Answer"
      />
      <button type="submit">Submit Answer</button>
    </form>
  );
};

export default AnswerForm;
