// frontend/src/components/SSEActivity.js
import React, { useState, useEffect } from "react";

function SSEActivity() {
  const [latestActivity, setLatestActivity] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8081/events");

    eventSource.onopen = () => {
      console.log("SSE connection opened");
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLatestActivity(data);
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close(); // Consider retrying the connection
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h3>Real-Time Activity Updates (SSE)</h3>
      {latestActivity ? (
        <p>
          User: {latestActivity.userId}, Heart Rate: {latestActivity.heartRate},
          Time: {latestActivity.timestamp}
        </p>
      ) : (
        <p>Waiting for activity updates...</p>
      )}
    </div>
  );
}

export default SSEActivity;
