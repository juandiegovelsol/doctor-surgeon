// TaskList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTasks, updateTaskStatus, deleteTask } from "./tasksSlice";
import { selectTeamMembers, selectTeamMemberById } from "./teamMembersSlice";

const TaskList = () => {
  const tasks = useSelector(selectTasks);
  const teamMembers = useSelector(selectTeamMembers);
  const dispatch = useDispatch();

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTaskStatus({ taskId, status: newStatus }));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId));
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => {
          const assignee = selectTeamMemberById(
            { teamMembers: { teamMembers } },
            task.assigneeId
          ); // Access teamMembers state slice correctly
          const assigneeName = assignee ? assignee.name : "Unassigned";

          return (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
              <p>Assigned to: {assigneeName}</p>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
