import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function Task({ task }) {
  const [localTitle, setLocalTitle] = useState(task.title.value);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    socket.emit("updateTaskTitle", { taskId: task.id, newTitle });
  };

  useEffect(() => {
    socket.on("taskTitleUpdated", (data) => {
      if (data.taskId === task.id) {
        setLocalTitle(data.title.value);
      }
    });

    return () => {
      socket.off("taskTitleUpdated");
    };
  }, [task.id]);

  return (
    <div>
      <input type="text" value={localTitle} onChange={handleTitleChange} />
    </div>
  );
}

export default Task;
