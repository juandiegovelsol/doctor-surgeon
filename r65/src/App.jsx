// App.js
import React from "react";
import TaskList from "./TaskList";
import TaskDetailView from "./TaskDetailView";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div>
      <h1>Task Management App</h1>
      <TaskList />
      <TaskDetailView taskId="task1" />{" "}
      {/* Example Task Detail View for task1 */}
      <Dashboard />
    </div>
  );
}

export default App;
