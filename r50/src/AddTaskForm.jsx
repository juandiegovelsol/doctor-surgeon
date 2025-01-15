import React, { useState } from "react";

function AddTaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText(""); // Clear input after adding
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
