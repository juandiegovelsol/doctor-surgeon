// TaskDetailView.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskById, updateTaskDetails } from "./tasksSlice";
import { selectTeamMembers } from "./teamMembersSlice";

const TaskDetailView = ({ taskId }) => {
  const task = useSelector((state) => selectTaskById(state, taskId));
  const teamMembers = useSelector(selectTeamMembers);
  const dispatch = useDispatch();

  if (!task) {
    return <p>Task not found</p>;
  }

  const handleInputChange = (e) => {
    dispatch(
      updateTaskDetails({
        taskId: task.id,
        updates: { [e.target.name]: e.target.value },
      })
    );
  };

  const handleAssigneeChange = (e) => {
    dispatch(
      updateTaskDetails({
        taskId: task.id,
        updates: { assigneeId: e.target.value },
      })
    );
  };

  return (
    <div>
      <h2>Task Details</h2>
      <h3>{task.title}</h3>
      <label htmlFor="taskTitle">Title:</label>
      <input
        type="text"
        id="taskTitle"
        name="title"
        value={task.title}
        onChange={handleInputChange}
      />

      <label htmlFor="taskDescription">Description:</label>
      <textarea
        id="taskDescription"
        name="description"
        value={task.description}
        onChange={handleInputChange}
      />

      <label htmlFor="taskStatus">Status:</label>
      <select
        id="taskStatus"
        name="status"
        value={task.status}
        onChange={handleInputChange}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <label htmlFor="taskAssignee">Assignee:</label>
      <select
        id="taskAssignee"
        name="assigneeId"
        value={task.assigneeId || ""} // Handle cases where assigneeId might be null/undefined initially
        onChange={handleAssigneeChange}
      >
        <option value="">Unassigned</option>
        {teamMembers.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskDetailView;
