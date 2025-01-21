// frontend/src/components/RealTimeActivity.js
import React, { useState, useEffect } from "react";

function RealTimeActivity() {
  const [latestActivity, setLatestActivity] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLatestActivity(data);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close(); // Clean up the connection on unmount
    };
  }, []);

  return (
    <div>
      <h3>Real-Time Activity Updates</h3>
      {latestActivity ? (
        <p>
          User: {latestActivity.userId}, Steps: {latestActivity.steps}, Time:{" "}
          {latestActivity.timestamp}
        </p>
      ) : (
        <p>Waiting for activity updates...</p>
      )}
    </div>
  );
}

export default RealTimeActivity;
