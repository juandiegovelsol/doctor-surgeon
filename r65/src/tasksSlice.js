// tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: "task1",
      title: "Design Dashboard UI",
      description: "Design the user interface for the main dashboard.",
      status: "To Do",
      assigneeId: "user1",
    },
    {
      id: "task2",
      title: "Develop Task List Component",
      description: "Build the React component to display a list of tasks.",
      status: "In Progress",
      assigneeId: "user2",
    },
    {
      id: "task3",
      title: "Implement Task Detail View",
      description: "Create a detailed view for individual tasks.",
      status: "Completed",
      assigneeId: "user1",
    },
  ],
  statusFilters: ["To Do", "In Progress", "Completed"], // Example filter options
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // ... (existing reducers: addTask, updateTaskStatus, updateTaskAssignee, updateTaskDetails, deleteTask)
    addTask: (state, action) => {
      // Keep existing addTask, rename if you need to differentiate local vs. WS add
      state.tasks.push(action.payload);
    },
    updateTaskDetails: (state, action) => {
      // Keep existing updateTaskDetails for local updates too
      const { taskId, updates } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        Object.assign(task, updates);
      }
    },
    deleteTask: (state, action) => {
      // Keep deleteTask
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    // Reducers for WebSocket events:
    realTimeTaskAdded: (state, action) => {
      state.tasks.push(action.payload); // Assume payload is the full task object
    },
    realTimeTaskUpdated: (state, action) => {
      const updatedTask = action.payload; // Assume payload is the updated task object
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask; // Replace the entire task object
      }
    },
    realTimeTaskDeleted: (state, action) => {
      const taskId = action.payload; // Assume payload is the task ID
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
});

export const {
  addTask,
  updateTaskStatus,
  updateTaskAssignee,
  updateTaskDetails,
  deleteTask,
  realTimeTaskAdded,
  realTimeTaskUpdated,
  realTimeTaskDeleted,
} = tasksSlice.actions;

// Selectors - for accessing state in components efficiently
export const selectTasks = (state) => state.tasks.tasks;
export const selectTaskById = (state, taskId) =>
  state.tasks.tasks.find((task) => task.id === taskId);
export const selectTaskStatusFilters = (state) => state.tasks.statusFilters;

export default tasksSlice.reducer;
