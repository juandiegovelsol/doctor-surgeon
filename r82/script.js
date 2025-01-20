const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

let currentSceneName = "outdoorArea1";
let previousScene = null;
let animationFrameId;
let gamePaused = false;
let gameState = "mainMenu"; // 'mainMenu', 'gameRunning', 'paused' (ADDED game state)

// --- Menu Element References ---
const mainMenu = document.getElementById("main-menu"); // Main menu container
const startButton = document.getElementById("start-button"); // Start Game button in main menu
const mainOptionsButton = document.getElementById("main-options-button"); // Options in main menu
const mainExitButton = document.getElementById("main-exit-button"); // Exit Game in main menu

const pauseMenu = document.getElementById("pause-menu");
const resumeButton = document.getElementById("resume-button");
const optionsButton = document.getElementById("options-button");
const exitMainMenuButton = document.getElementById("exit-main-menu-button"); // Exit to Main Menu button in pause menu
// --- End Menu Element References ---

let sceneData = {
  outdoorArea1: {
    grid: [
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        1,
      ], // Building 1 entrance (21), Outdoor Exit to Area2 (4)
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
        1,
      ],
      [
        1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
        1,
      ],
      [
        1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
        1,
      ], // Building 2 entrance (22)
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1,
      ],
    ],
    backgroundColor: "#f0f0f0",
    exits: [
      {
        type: "outdoorAreaExit",
        tileType: 4,
        targetScene: "outdoorArea2",
        playerPosition: { x: 2, y: 2 },
      },
      {
        type: "buildingEntrance",
        tileType: 21,
        targetScene: "building1",
        playerPosition: { x: 1, y: 1 },
      },
      {
        type: "buildingEntrance",
        tileType: 22,
        targetScene: "building2",
        playerPosition: { x: 2, y: 1 },
      },
    ],
  },
  outdoorArea2: {
    grid: [
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ], // Outdoor Area 2 Exit (11)
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1,
      ],
    ],
    backgroundColor: "#d0d0d0",
    startPosition: { x: 2, y: 2 },
    exits: [
      // Added exits for outdoorArea2
      {
        type: "outdoorAreaExit",
        tileType: 11, // Tile type 11 is the exit
        targetScene: "outdoorArea1",
        playerPosition: { x: 23, y: 3 }, // Example: Return near the right exit of Area1
      },
    ],
  },
  building1: {
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 31, 1, 1, 1, 1, 1], // Building 1 Exit (31)
    ],
    backgroundColor: "#e0e0e0",
    startPosition: { x: 4, y: 6 },
    exitTileType: 31,
    returnScene: "outdoorArea1",
  },
  building2: {
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 32, 1, 1, 1, 1, 1], // Building 2 Exit (32)
    ],
    backgroundColor: "#f0e0e0",
    startPosition: { x: 4, y: 6 },
    exitTileType: 32,
    returnScene: "outdoorArea1",
  },
};

let player = { x: 2, y: 2 };

function resetGame() {
  // Function to reset game state
  currentSceneName = "outdoorArea1";
  previousScene = null;
  player.x = sceneData[currentSceneName].startPosition.x;
  player.y = sceneData[currentSceneName].startPosition.y;
  gamePaused = false;
  gameState = "gameRunning"; // Set gameState to running when game starts
}

function drawGrid(grid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let tileType = grid[y][x];
      let drawColor;

      switch (tileType) {
        case 1:
          drawColor = "blue";
          break;
        case 11:
          drawColor = "sienna";
          break;
        case 21:
          drawColor = "brown";
          break;
        case 22:
          drawColor = "darkgoldenrod";
          break;
        case 31:
          drawColor = "lightgreen";
          break;
        case 32:
          drawColor = "mediumseagreen";
          break;
        case 4:
          drawColor = "sandybrown";
          break;
        default:
          drawColor = "green";
      }

      ctx.fillStyle = drawColor;
      ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
      ctx.strokeStyle = "#ccc";
      ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "red";
  ctx.fillRect(player.x * gridSize, player.y * gridSize, gridSize, gridSize);
}

function gameLoop() {
  if (gameState === "gameRunning" && !gamePaused) {
    // Only run if game is running and not paused
    canvas.style.display = "block"; // Ensure canvas is visible when game running
    canvas.style.backgroundColor = sceneData[currentSceneName].backgroundColor;
    let currentGrid = sceneData[currentSceneName].grid;
    drawGrid(currentGrid);
    drawPlayer();
    animationFrameId = requestAnimationFrame(gameLoop);
  } else {
    cancelAnimationFrame(animationFrameId); // Stop game loop when not running or paused
  }
}

function handleSceneTransition(x, y) {
  const currentSceneData = sceneData[currentSceneName];
  const tileType = currentSceneData.grid[y][x];

  if (currentSceneName.startsWith("outdoorArea")) {
    const exits = currentSceneData.exits;
    for (const exit of exits) {
      if (tileType === exit.tileType) {
        previousScene = {
          scene: currentSceneName,
          x: player.x,
          y: player.y,
        };
        currentSceneName = exit.targetScene;
        player.x = sceneData[currentSceneName].startPosition.x;
        player.y = sceneData[currentSceneName].startPosition.y;
        return;
      }
    }
  } else if (currentSceneName.startsWith("building")) {
    if (tileType === sceneData[currentSceneName].exitTileType) {
      currentSceneName = sceneData[currentSceneName].returnScene;
      player.x = previousScene.x;
      player.y = previousScene.y;
      previousScene = null;
    }
  }
}

const togglePauseMenu = () => {
  if (gameState === "gameRunning") {
    // Only allow pausing if game is running
    gamePaused = !gamePaused;
    pauseMenu.classList.toggle("hidden");
    if (gamePaused) {
      console.log("Game Paused");
      // game loop is stopped in gameLoop function itself when gamePaused is true
    } else {
      console.log("Game Resumed");
      gameLoop(); // Restart game loop on resume
    }
  }
};

document.addEventListener("keydown", (event) => {
  if (gameState === "gameRunning" && !gamePaused) {
    // Only process input if game is running and not paused
    let newX = player.x;
    let newY = player.y;

    switch (event.key) {
      case "ArrowUp":
        newY--;
        break;
      case "ArrowDown":
        newY++;
        break;
      case "ArrowLeft":
        newX--;
        break;
      case "ArrowRight":
        newX++;
        break;
      case "P":
      case "Escape":
        togglePauseMenu();
        return;
      default:
        return;
    }

    let currentGrid = sceneData[currentSceneName].grid;

    if (
      newX >= 0 &&
      newX < currentGrid[0].length &&
      newY >= 0 &&
      newY < currentGrid.length
    ) {
      if (currentGrid[newY][newX] !== 1) {
        player.x = newX;
        player.y = newY;
        handleSceneTransition(newX, newY);
      }
    }
  } else if (gameState === "gameRunning" && gamePaused) {
    // If game is paused, only listen for 'P' or 'Escape' to unpause
    if (event.key === "P" || event.key === "Escape") {
      togglePauseMenu();
    }
  }
});

resumeButton.addEventListener("click", () => {
  togglePauseMenu();
});

optionsButton.addEventListener("click", () => {
  alert("Options Menu (Pause Menu - Not Implemented)");
});

exitMainMenuButton.addEventListener("click", () => {
  // Exit to Main Menu action
  pauseMenu.classList.add("hidden"); // Hide pause menu
  canvas.style.display = "none"; // Hide game canvas
  mainMenu.classList.remove("hidden"); // Show main menu
  gameState = "mainMenu"; // Set game state to main menu
  gamePaused = false; // Ensure game is unpaused when returning to main menu
  gameLoop(); // Stop the game loop effectively by checking gameState
});

startButton.addEventListener("click", () => {
  // Start Game action
  mainMenu.classList.add("hidden"); // Hide main menu
  canvas.style.display = "block"; // Show game canvas
  resetGame(); // Reset game state
  gameLoop(); // Start the game loop
});

mainOptionsButton.addEventListener("click", () => {
  alert("Options Menu (Main Menu - Not Implemented)");
});

mainExitButton.addEventListener("click", () => {
  // Attempt to close the current tab/window - from main menu
  window.close();
  alert("Exiting Game (Attempting to close tab from Main Menu)"); // Alert may be shown if close is blocked
});

// --- Initial setup - Show Main Menu, Hide Game ---
mainMenu.classList.remove("hidden"); // Ensure main menu is visible on start
canvas.style.display = "none"; // Ensure canvas is hidden on start
gameState = "mainMenu"; // Initial game state is main menu
