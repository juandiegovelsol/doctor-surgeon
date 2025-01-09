import React, { useState } from "react";
import "./App.css";

const ProgressBar = ({ progress }) => {
  const circumference = 150 * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-container">
      <svg className="progress-circle" width="150" height="150">
        <circle
          className="progress-ring-background"
          strokeWidth="10"
          fill="none"
          r="70"
          cx="75"
          cy="75"
        />
        <circle
          className="progress-ring-fill"
          strokeWidth="10"
          fill="none"
          r="70"
          cx="75"
          cy="75"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transformOrigin: "center",
            transform: "-90deg",
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="progress-text"
        >
          {Math.round(progress)}%
        </text>
      </svg>
    </div>
  );
};

const Checklist = ({ tasks, onTaskChange }) => {
  return (
    <div className="checklist-container">
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <div className="checklist-item" key={task.id}>
          <input
            type="checkbox"
            id={task.id}
            checked={task.completed}
            onChange={() => onTaskChange(task.id)}
          />
          <label htmlFor={task.id}>{task.label}</label>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [tasks, setTasks] = useState([
    { id: "task1", label: "Task 1", completed: false },
    { id: "task2", label: "Task 2", completed: false },
    { id: "task3", label: "Task 3", completed: false },
    { id: "task4", label: "Task 4", completed: false },
  ]);

  const handleCheckboxChange = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <div>
      <ProgressBar progress={progress} />
      <Checklist tasks={tasks} onTaskChange={handleCheckboxChange} />
    </div>
  );
}

export default App;
