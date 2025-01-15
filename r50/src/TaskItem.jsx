import React from "react";

function TaskItem({ task, onUpdateTask, onDeleteTask }) {
  const handleToggleComplete = () => {
    onUpdateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
      />
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.text}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default TaskItem;
