import React, { useState, useEffect } from "react"; // Import useEffect
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";

function TodoList() {
  // Key to use for storing tasks in local storage
  const LOCAL_STORAGE_KEY = "todo-tasks";

  // Function to get tasks from local storage, or initial tasks if none
  const getStoredTasks = () => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      return JSON.parse(storedTasks);
    } else {
      return [
        // Optional: Initial tasks if local storage is empty
        { id: 1, text: "Learn React Persistence", completed: false },
        { id: 2, text: "Persist To-Do App", completed: true },
      ];
    }
  };

  const [tasks, setTasks] = useState(getStoredTasks()); // Initialize state from local storage

  // useEffect to save tasks to local storage whenever 'tasks' state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]); // Dependency array: useEffect runs when 'tasks' changes

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

  return (
    <div>
      <h1>My Persistent To-Do List</h1>
      <AddTaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}

export default TodoList;
