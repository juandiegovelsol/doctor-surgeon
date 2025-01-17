// Get canvas and context, score/lines elements (updated to include lines element)
const canvas = document.getElementById("tetris-canvas");
const ctx = canvas.getContext("2d");
const scoreValueElement = document.getElementById("score-value");
const linesValueElement = document.getElementById("lines-value"); // NEW: Get lines display element

// --- Game Constants and Variables --- (updated to include lines cleared and speed levels)
const gridSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const gridCols = canvasWidth / gridSize;
const gridRows = canvasHeight / gridSize;

let score = 0;
let linesCleared = 0; // NEW: Lines cleared counter, initialized to 0
let gameBoard = createGameBoard();
let currentTetromino = null;
let tetrominoX = 0;
let tetrominoY = 0;
let dropCounter = 0;
let dropInterval = 1000; // Initial drop interval (1 second)
const baseDropInterval = 1000; // Store base drop interval for resetting
const speedIncreaseFactor = 0.9; // Factor to reduce dropInterval by when speeding up

// --- Tetromino Shapes and Colors --- (same as before)
const tetrominoShapes = [
  // I-shape
  [[1, 1, 1, 1]],

  // J-shape
  [
    [1, 0, 0],
    [1, 1, 1],
  ],

  // L-shape
  [
    [0, 0, 1],
    [1, 1, 1],
  ],

  // O-shape
  [
    [1, 1],
    [1, 1],
  ],

  // S-shape
  [
    [0, 1, 1],
    [1, 1, 0],
  ],

  // T-shape
  [
    [0, 1, 0],
    [1, 1, 1],
  ],

  // Z-shape
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
];

const tetrominoColors = [
  "cyan",
  "blue",
  "orange",
  "yellow",
  "green",
  "purple",
  "red",
];

// --- Functions --- (Updated placeTetromino and gameLoop for new features)

// Function to create an empty game board (same as before)
function createGameBoard() {
  return Array(gridRows)
    .fill(null)
    .map(() => Array(gridCols).fill(0));
}

// Function to get a random tetromino shape and color (same as before)
function getRandomTetromino() {
  const shapeIndex = Math.floor(Math.random() * tetrominoShapes.length);
  const colorIndex = shapeIndex; // Use same index for color for simplicity
  return {
    shape: tetrominoShapes[shapeIndex],
    color: tetrominoColors[colorIndex],
  };
}

// Function to spawn a new tetromino (same as before)
function spawnTetromino() {
  currentTetromino = getRandomTetromino();
  tetrominoX =
    Math.floor(gridCols / 2) - Math.floor(currentTetromino.shape[0].length / 2); // Center horizontally
  tetrominoY = 0; // Start at the top
  if (checkCollision(0, 0)) {
    // Game Over check right at spawn
    gameBoard = createGameBoard(); // Reset the board
    score = 0; // Reset score
    linesCleared = 0; // NEW: Reset lines cleared
    dropInterval = baseDropInterval; // NEW: Reset drop interval to base speed
    alert("Game Over! Score: " + score + ", Lines: " + linesCleared); // Updated Game Over message
  }
}

// Function to check for collision (same as before)
function checkCollision(offsetX, offsetY, rotatedShape = null) {
  const shape = rotatedShape || currentTetromino.shape;
  const shapeHeight = shape.length;
  const shapeWidth = shape[0].length;

  for (let row = 0; row < shapeHeight; row++) {
    for (let col = 0; col < shapeWidth; col++) {
      if (shape[row][col]) {
        // If it's a block of the tetromino
        let boardRow = tetrominoY + row + offsetY;
        let boardCol = tetrominoX + col + offsetX;

        // Check boundaries
        if (boardRow >= gridRows || boardCol < 0 || boardCol >= gridCols) {
          return true; // Collision with board boundary
        }
        // Check collision with existing blocks on the board
        if (boardRow >= 0 && gameBoard[boardRow][boardCol] !== 0) {
          // boardRow >= 0 is needed for cases when tetromino is partially above the board at start
          return true; // Collision with another block
        }
      }
    }
  }
  return false; // No collision
}

// Function to place the tetromino on the game board (UPDATED for line clearing, score multiplier, and speed increase)
function placeTetromino() {
  const shape = currentTetromino.shape;
  const shapeHeight = shape.length;
  const shapeWidth = shape[0].length;

  for (let row = 0; row < shapeHeight; row++) {
    for (let col = 0; col < shapeWidth; col++) {
      if (shape[row][col]) {
        gameBoard[tetrominoY + row][tetrominoX + col] = currentTetromino.color; // Store color on board
      }
    }
  }

  // --- Line clearing logic (UPDATED for multi-line clearing and score multiplier) ---
  let linesJustCleared = 0; // Count lines cleared in this placement
  for (let row = gridRows - 1; row >= 0; row--) {
    if (gameBoard[row].every((cell) => cell !== 0)) {
      // If every cell in a row is filled
      linesJustCleared++; // Increment lines cleared in this placement
      // Remove the filled row and shift rows above down
      gameBoard.splice(row, 1); // Remove the row
      gameBoard.unshift(Array(gridCols).fill(0)); // Add a new empty row at the top
    }
  }

  if (linesJustCleared > 0) {
    linesCleared += linesJustCleared; // Update total lines cleared count

    // Score multiplier based on lines cleared simultaneously
    let scoreMultiplier = 1;
    if (linesJustCleared === 2) scoreMultiplier = 2;
    else if (linesJustCleared === 3) scoreMultiplier = 4;
    else if (linesJustCleared >= 4) scoreMultiplier = 8; // Tetris!

    score += linesJustCleared * 10 * scoreMultiplier; // Apply score multiplier

    // Check if lines cleared is a multiple of 10, and increase speed
    if (linesCleared % 1 === 0) {
      dropInterval *= speedIncreaseFactor; // Reduce drop interval to increase speed
      if (dropInterval < 100) dropInterval = 100; // Minimum speed limit to avoid being too fast
    }
  }

  spawnTetromino(); // Spawn the next tetromino
}

// Function to move tetromino down (same as before)
function moveTetrominoDown() {
  if (!checkCollision(0, 1)) {
    tetrominoY++;
  } else {
    placeTetromino(); // Place and spawn new if collision downwards
  }
  dropCounter = 0; // Reset drop counter after each move/attempt
}

// Function to move tetromino left (same as before)
function moveTetrominoLeft() {
  if (!checkCollision(-1, 0)) {
    tetrominoX--;
  }
}

// Function to move tetromino right (same as before)
function moveTetrominoRight() {
  if (!checkCollision(1, 0)) {
    tetrominoX++;
  }
}

// Function to rotate Tetromino (same as before)
function rotateTetromino() {
  const originalShape = currentTetromino.shape;
  const rotatedShape = [];
  const rows = originalShape.length;
  const cols = originalShape[0].length;

  for (let j = 0; j < cols; j++) {
    rotatedShape[j] = []; // Initialize new row
    for (let i = rows - 1; i >= 0; i--) {
      // Iterate original rows in reverse for 90-degree clockwise
      rotatedShape[j].push(originalShape[i][j]);
    }
  }

  if (!checkCollision(0, 0, rotatedShape)) {
    // Pass rotatedShape to collision check
    currentTetromino.shape = rotatedShape; // Update to the rotated shape if no collision
  } else {
    // Optionally, implement wall-kick/rotation correction logic here if needed
    // For now, if rotation causes collision, we simply don't rotate.
  }
}

// --- Drawing Functions --- (same as before)
function drawBlock(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

// Function to draw the game board (same as before)
function drawGameBoard() {
  for (let y = 0; y < gridRows; y++) {
    for (let x = 0; x < gridCols; x++) {
      if (gameBoard[y][x]) {
        drawBlock(x, y, gameBoard[y][x]);
      }
    }
  }
}

// Function to draw the current tetromino (same as before)
function drawTetromino() {
  if (currentTetromino) {
    const shape = currentTetromino.shape;
    const color = currentTetromino.color;
    const shapeHeight = shape.length;
    const shapeWidth = shape[0].length;

    for (let row = 0; row < shapeHeight; row++) {
      for (let col = 0; col < shapeWidth; col++) {
        if (shape[row][col]) {
          drawBlock(tetrominoX + col, tetrominoY + row, color);
        }
      }
    }
  }
}

// --- Game Loop --- (Updated to display lines cleared count)
function gameLoop() {
  // 1. Clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // 2. Update game state (Handle tetromino drop)
  dropCounter += performance.now() - lastTime;
  lastTime = performance.now();
  if (dropCounter > dropInterval) {
    moveTetrominoDown();
  }

  // 3. Draw the game elements
  drawGameBoard();
  drawTetromino();
  scoreValueElement.textContent = score;
  linesValueElement.textContent = linesCleared; // NEW: Update lines display

  requestAnimationFrame(gameLoop);
}

// --- Input Handling --- (same as before)
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    moveTetrominoLeft();
  } else if (event.key === "ArrowRight") {
    moveTetrominoRight();
  } else if (event.key === "ArrowDown") {
    moveTetrominoDown(); // Soft drop
  } else if (event.key === "x") {
    // 'x' key for rotation
    rotateTetromino();
  }
});

// --- Initialize Game --- (Updated to reset lines cleared and drop interval)
let lastTime = 0;
function initializeGame() {
  console.log("Game initialized");
  gameBoard = createGameBoard();
  score = 0; // Reset score
  linesCleared = 0; // NEW: Reset lines cleared
  dropInterval = baseDropInterval; // NEW: Reset drop interval to base speed
  spawnTetromino();
  lastTime = performance.now();
  gameLoop();
}

// Start the game!
initializeGame();
