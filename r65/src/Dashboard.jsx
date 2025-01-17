// Dashboard.js
import React from "react";
import { useSelector } from "react-redux";
import { selectTasks } from "./tasksSlice";

const Dashboard = () => {
  const tasks = useSelector(selectTasks);

  const tasksByStatus = tasks.reduce((acc, task) => {
    acc[task.status] = acc[task.status] || 0;
    acc[task.status]++;
    return acc;
  }, {});

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Tasks by Status</h3>
        <ul>
          {Object.entries(tasksByStatus).map(([status, count]) => (
            <li key={status}>
              {status}: {count}
            </li>
          ))}
        </ul>
      </div>
      {/* You can add more dashboard widgets here, like tasks per assignee, etc. */}
    </div>
  );
};

export default Dashboard;
