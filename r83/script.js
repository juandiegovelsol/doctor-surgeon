// --- Game State ---
let gameState = {
  playerPosition: { x: 0, y: 0 },
  playerScore: 0,
};

// --- DOM Element Selectors ---
const positionDisplay = document.getElementById("player-position");
const scoreDisplay = document.getElementById("player-score");
const messageDisplay = document.getElementById("message-display");

const moveUpButton = document.getElementById("move-button-up");
const moveDownButton = document.getElementById("move-button-down");
const moveLeftButton = document.getElementById("move-button-left");
const moveRightButton = document.getElementById("move-button-right");
const increaseScoreButton = document.getElementById("increase-score-button");
const saveButton = document.getElementById("save-button");
const loadButton = document.getElementById("load-button");

// --- Functions to Update Game Display ---
function updateDisplay() {
  positionDisplay.textContent = `(${gameState.playerPosition.x}, ${gameState.playerPosition.y})`;
  scoreDisplay.textContent = gameState.playerScore;
}

function displayMessage(message, duration = 3000) {
  messageDisplay.textContent = message;
  setTimeout(() => {
    messageDisplay.textContent = ""; // Clear message after duration
  }, duration);
}

// --- Game Logic Functions ---
function movePlayer(direction) {
  switch (direction) {
    case "up":
      gameState.playerPosition.y--;
      break;
    case "down":
      gameState.playerPosition.y++;
      break;
    case "left":
      gameState.playerPosition.x--;
      break;
    case "right":
      gameState.playerPosition.x++;
      break;
  }
  updateDisplay();
}

function increaseScore() {
  gameState.playerScore++;
  updateDisplay();
}

// --- Save and Load Functions ---
function saveGame() {
  const gameStateString = JSON.stringify(gameState);
  localStorage.setItem("simpleGameSave", gameStateString);
  displayMessage("Game Saved!");
  console.log("Game Saved:", gameState); // For debugging in console
}

function loadGame() {
  const savedGameStateString = localStorage.getItem("simpleGameSave");
  if (savedGameStateString) {
    gameState = JSON.parse(savedGameStateString);
    updateDisplay();
    displayMessage("Game Loaded!");
    console.log("Game Loaded:", gameState); // For debugging in console
  } else {
    displayMessage("No saved game found.");
    console.log("No saved game found.");
  }
}

// --- Event Listeners for Buttons ---
moveUpButton.addEventListener("click", () => movePlayer("up"));
moveDownButton.addEventListener("click", () => movePlayer("down"));
moveLeftButton.addEventListener("click", () => movePlayer("left"));
moveRightButton.addEventListener("click", () => movePlayer("right"));
increaseScoreButton.addEventListener("click", increaseScore);
saveButton.addEventListener("click", saveGame);
loadButton.addEventListener("click", loadGame);

// --- Initial Game Setup (and attempt to load on start) ---
updateDisplay(); // Initialize display with starting game state
loadGame(); // Attempt to load game state when page loads
