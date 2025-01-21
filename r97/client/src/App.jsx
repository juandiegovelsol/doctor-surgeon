// App.js or a dedicated WebSocket service
import React, { useEffect, useRef } from "react";
import useLeaderboardStore from "./store/leaderboardStore";
import Leaderboard from "./Leaderboard";
import AnswerForm from "./AnswerForm";

const App = () => {
  const websocketRef = useRef(null);
  const setLeaderboard = useLeaderboardStore((state) => state.setLeaderboard);
  const updateUserScore = useLeaderboardStore((state) => state.updateUserScore);
  const addUser = useLeaderboardStore((state) => state.addUser);
  const removeUser = useLeaderboardStore((state) => state.removeUser);

  useEffect(() => {
    websocketRef.current = new WebSocket("ws://your-backend-url/ws"); // Replace with your backend URL

    websocketRef.current.onopen = () => {
      console.log("WebSocket connected");
      // Optionally send initial data or request leaderboard on connection
    };

    websocketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    websocketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case "leaderboard_update":
          setLeaderboard(message.leaderboard);
          break;
        case "score_update":
          updateUserScore(message.userId, message.score);
          break;
        case "user_joined":
          addUser(message.user);
          break;
        case "user_left":
          removeUser(message.userId);
          break;
        // Handle other message types (e.g., question updates)
        default:
          console.log("Received unknown message:", message);
      }
    };

    websocketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (
        websocketRef.current &&
        websocketRef.current.readyState === WebSocket.OPEN
      ) {
        websocketRef.current.close();
      }
    };
  }, [setLeaderboard, updateUserScore, addUser, removeUser]);

  return (
    <div>
      <h1>Quiz Platform</h1>
      <Leaderboard />
      <AnswerForm websocket={websocketRef.current} />
      {/* Other components */}
    </div>
  );
};

export default App;
