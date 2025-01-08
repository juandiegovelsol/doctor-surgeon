import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";

const Scoreboard = () => {
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [playStats, setPlayStats] = useState([]);

  useEffect(() => {
    // Initialize Pusher client
    const pusher = new Pusher("04a53b14ad3a6804eaf1", {
      cluster: "us2",
    });

    pusher.connection.bind("error", function (err) {
      console.error("Pusher connection error:", err);
    });

    // Subscribe to a channel (e.g., 'game-channel')
    const channel = pusher.subscribe("game-channel");

    // Bind to events on the channel
    channel.bind("score-update", (data) => {
      setScore(data);
    });

    channel.bind("new-play", (data) => {
      setPlayStats((prevStats) => [...prevStats, data]);
    });

    // Unsubscribe from the channel when the component unmounts
    return () => {
      pusher.unsubscribe("game-channel");
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <h2>Live Score</h2>
      <p>
        Home: {score.home} - Away: {score.away}
      </p>

      <h3>Play-by-Play</h3>
      <ul>
        {playStats.map((play, index) => (
          <li key={index}>{play.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
