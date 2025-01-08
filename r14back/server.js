const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1922793",
  key: "04a53b14ad3a6804eaf1",
  secret: "18ffd8756d6468f3fe09",
  cluster: "us2",
  useTLS: true,
});

// Example of triggering a score update event
function updateScore(homeScore, awayScore) {
  pusher.trigger("game-channel", "score-update", {
    home: homeScore,
    away: awayScore,
  });
}

// Example of triggering a new play event
function addNewPlay(playDescription) {
  pusher.trigger("game-channel", "new-play", {
    description: playDescription,
  });
}

function handleGoal(homeScore, awayScore, scorer) {
  // Trigger score update event (as before)
  pusher.trigger("game-channel", "score-update", {
    home: homeScore,
    away: awayScore,
  });

  // Trigger notification event for the goal
  pusher.trigger("notifications-channel", "goal-scored", {
    message: `GOAL! ${scorer} scores!`,
    homeScore: homeScore,
    awayScore: awayScore,
  });
}

function handlePenalty(teamFouled, playerCommitted) {
  // Trigger notification event for the penalty
  pusher.trigger("notifications-channel", "penalty-awarded", {
    message: `Penalty awarded to ${teamFouled}! Foul by ${playerCommitted}.`,
  });
}

// Simulate game events (replace with your actual game logic)
setInterval(() => {
  const newHomeScore = Math.floor(Math.random() * 5);
  const newAwayScore = Math.floor(Math.random() * 5);
  updateScore(newHomeScore, newAwayScore);

  const plays = ["Goal!", "Foul.", "Pass intercepted.", "Shot blocked."];
  const randomPlay = plays[Math.floor(Math.random() * plays.length)];
  addNewPlay(randomPlay);

  // Example of how you might use these functions in your game logic
  // ... (game logic where a goal is scored)
  handleGoal(currentHomeScore + 1, currentAwayScore, "Player X");

  // ... (game logic where a penalty is awarded)
  handlePenalty("Team A", "Player Y");
}, 5000); // Send updates every 5 seconds
