import { startGame } from "./dragon-breath-game.js"; // Import the startGame function

const enterTavernButton = document.getElementById("enter-tavern-button");
const tavernScene = document.getElementById("tavern-scene");
const mainGameScene = document.getElementById("main-game-scene");
const exitTavernButton = document.getElementById("exit-tavern-button");
const mainGameCurrencySpan = document.getElementById("main-game-currency");

let playerGameCurrency = 150; // Initial player currency in the main game
mainGameCurrencySpan.textContent = playerGameCurrency; // Display initial currency in main game

let dragonBreathGameInstance = null; // To hold the Dragon's Breath game instance if needed

enterTavernButton.addEventListener("click", () => {
  mainGameScene.style.display = "none";
  tavernScene.style.display = "block";
  console.log(startGame);

  // Initialize and start Dragon's Breath when entering tavern
  dragonBreathGameInstance = startGame(playerGameCurrency); // Pass player's main game currency

  // You might need to update the tavern's currency display separately here initially, if it's different visually
  const tavernCurrencySpan = document.getElementById("player-currency"); // Note: different ID in tavern scene HTML
  tavernCurrencySpan.textContent = playerGameCurrency; // Set tavern display to initial currency
});

exitTavernButton.addEventListener("click", () => {
  tavernScene.style.display = "none";
  mainGameScene.style.display = "block";

  // When exiting, update main game currency with the result from Dragon's Breath
  if (dragonBreathGameInstance) {
    playerGameCurrency = dragonBreathGameInstance.getCurrentCurrency(); // Get updated currency from minigame
    mainGameCurrencySpan.textContent = playerGameCurrency; // Update main game currency display
  }
  dragonBreathGameInstance = null; // Clear the instance when exiting if needed
});
