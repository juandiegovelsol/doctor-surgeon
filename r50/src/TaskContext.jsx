import React, { createContext, useState, useEffect } from "react"; // Import useEffect

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const LOCAL_STORAGE_KEY = "todo-tasks-context"; // Key for Context API example

  const getStoredTasks = () => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      return JSON.parse(storedTasks);
    } else {
      return [
        // Optional: Initial tasks for context example
        { id: 1, text: "Learn Context Persistence", completed: false },
        { id: 2, text: "Persist Context To-Do App", completed: true },
      ];
    }
  };

  const [tasks, setTasks] = useState(getStoredTasks()); // Initialize from local storage

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]); // Save to local storage on tasks change

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const taskContextValue = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={taskContextValue}>
      {children}
    </TaskContext.Provider>
  );
}
