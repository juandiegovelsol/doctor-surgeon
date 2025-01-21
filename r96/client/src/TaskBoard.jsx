import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function TaskBoard() {
  const [tasks, setTasks] = useState({}); // Assume tasks are fetched initially

  const handleMoveTask = (taskId, newColumn) => {
    const currentTask = tasks[taskId];
    if (currentTask) {
      socket.emit("moveTask", {
        taskId,
        newColumn,
        currentVersion: currentTask.version,
      });
    }
  };

  useEffect(() => {
    socket.on("taskMoved", (data) => {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [data.taskId]: {
          ...prevTasks[data.taskId],
          column: data.newColumn,
          version: data.version,
        },
      }));
    });

    socket.on("moveTaskConflict", (data) => {
      console.log(`Conflict for task ${data.taskId}. Please refresh or retry.`);
      // Optionally, fetch the latest state and allow the user to re-apply the action.
    });

    return () => {
      socket.off("taskMoved");
      socket.off("moveTaskConflict");
    };
  }, [tasks]);

  // ... rendering logic for the task board
}
