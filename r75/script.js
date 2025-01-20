const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game Constants
const PLAYER_SPEED = 5;
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 20;
const PROJECTILE_SPEED = 7;
const PROJECTILE_WIDTH = 4;
const PROJECTILE_HEIGHT = 10;
const ENEMY_WIDTH = 24;
const ENEMY_HEIGHT = 24;
let ENEMY_SPEED = 1; // Changed from const to let
const ENEMY_DIVE_SPEED = 3;
const ENEMY_FORMATION_ROWS = 4;
const ENEMY_FORMATION_COLS = 8;
const ENEMY_FORMATION_PADDING_X = 40;
const ENEMY_FORMATION_PADDING_Y = 30;
const ENEMY_DIVE_CHANCE = 0.0005; // Much lower chance of diving (e.g., 0.05%)  <-- CHANGED HERE
const ENEMY_VERTICAL_STEP = 5; // You can adjust this value

// Game Variables
let playerX = canvas.width / 2 - PLAYER_WIDTH / 2;
let playerY = canvas.height - PLAYER_HEIGHT - 20;
let projectiles = [];
let enemies = [];
let score = 0;
let gameRunning = true;

// Input Handling
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  } else if (e.key === "Space" || e.key === " ") {
    fireProjectile();
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

// Game Objects
function createPlayer() {
  ctx.fillStyle = "green"; // Player is green
  ctx.fillRect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
}

function createProjectile(x, y) {
  projectiles.push({ x: x, y: y, active: true });
}

function fireProjectile() {
  createProjectile(playerX + PLAYER_WIDTH / 2 - PROJECTILE_WIDTH / 2, playerY);
}

function drawProjectiles() {
  ctx.fillStyle = "yellow"; // Projectiles are yellow
  projectiles.forEach((projectile) => {
    if (projectile.active) {
      ctx.fillRect(
        projectile.x,
        projectile.y,
        PROJECTILE_WIDTH,
        PROJECTILE_HEIGHT
      );
    }
  });
}

function createEnemies() {
  for (let row = 0; row < ENEMY_FORMATION_ROWS; row++) {
    for (let col = 0; col < ENEMY_FORMATION_COLS; col++) {
      enemies.push({
        x:
          ENEMY_FORMATION_PADDING_X +
          col * (ENEMY_WIDTH + ENEMY_FORMATION_PADDING_X),
        y:
          ENEMY_FORMATION_PADDING_Y +
          row * (ENEMY_HEIGHT + ENEMY_FORMATION_PADDING_Y),
        active: true,
        diving: false,
        diveTargetX: 0, // Target X for diving enemy
      });
    }
  }
}

function drawEnemies() {
  ctx.fillStyle = "red"; // Enemies are red
  enemies.forEach((enemy) => {
    if (enemy.active) {
      ctx.fillRect(enemy.x, enemy.y, ENEMY_WIDTH, ENEMY_HEIGHT);
    }
  });
}

function moveEnemies() {
  let formationDirection = 1; // 1 for right, -1 for left
  let formationReachedEdge = false;

  enemies.forEach((enemy) => {
    if (enemy.active && !enemy.diving) {
      // Only move if active and not diving
      enemy.x += ENEMY_SPEED * formationDirection;

      // Check if formation reached edge (simplified - check any enemy)
      if (enemy.x + ENEMY_WIDTH > canvas.width || enemy.x < 0) {
        formationReachedEdge = true;
      }
    }
  });

  if (formationReachedEdge) {
    ENEMY_SPEED *= -1; // Reverse direction
    enemies.forEach((enemy) => {
      if (enemy.active && !enemy.diving) {
        enemy.y += ENEMY_VERTICAL_STEP; // Use the new constant here
      }
    });
  }
}

function makeEnemiesDive() {
  enemies.forEach((enemy) => {
    if (enemy.active && !enemy.diving) {
      if (Math.random() < ENEMY_DIVE_CHANCE) {
        enemy.diving = true;
        enemy.diveTargetX = playerX; // Target current player X position
      }
    }
  });
}

function moveDivingEnemies() {
  enemies.forEach((enemy) => {
    if (enemy.active && enemy.diving) {
      enemy.y += ENEMY_DIVE_SPEED;
      // Simple straight dive, adjust X towards target if needed for more advanced diving patterns
      if (enemy.x < enemy.diveTargetX) {
        enemy.x += ENEMY_DIVE_SPEED / 2; // Adjust speed to match vertical
      } else if (enemy.x > enemy.diveTargetX) {
        enemy.x -= ENEMY_DIVE_SPEED / 2;
      }

      if (enemy.y > canvas.height) {
        enemy.diving = false; // Enemy reached bottom, stop diving
        enemy.y = 0 - ENEMY_HEIGHT; // Reset to top, could reposition back in formation later
        enemy.active = false; // For now, just deactivate after dive in this simple example
      }
    }
  });
}

function movePlayer() {
  if (rightPressed && playerX < canvas.width - PLAYER_WIDTH) {
    playerX += PLAYER_SPEED;
  } else if (leftPressed && playerX > 0) {
    playerX -= PLAYER_SPEED;
  }
}

function moveProjectiles() {
  projectiles.forEach((projectile) => {
    if (projectile.active) {
      projectile.y -= PROJECTILE_SPEED;
      if (projectile.y < 0) {
        projectile.active = false; // Deactivate projectile when off-screen
      }
    }
  });
  projectiles = projectiles.filter((projectile) => projectile.active); // Remove inactive projectiles
}

function checkCollisions() {
  projectiles.forEach((projectile) => {
    enemies.forEach((enemy) => {
      if (enemy.active && projectile.active) {
        if (
          projectile.x < enemy.x + ENEMY_WIDTH &&
          projectile.x + PROJECTILE_WIDTH > enemy.x &&
          projectile.y < enemy.y + ENEMY_HEIGHT &&
          projectile.y + PROJECTILE_HEIGHT > enemy.y
        ) {
          enemy.active = false;
          projectile.active = false;
          score += 10;
        }
      }
    });
  });

  enemies.forEach((enemy) => {
    // Collision with diving enemies and player
    if (enemy.active && enemy.diving) {
      if (
        enemy.x < playerX + PLAYER_WIDTH &&
        enemy.x + ENEMY_WIDTH > playerX &&
        enemy.y < playerY + PLAYER_HEIGHT &&
        enemy.y + ENEMY_HEIGHT > playerY
      ) {
        gameRunning = false; // Game Over! In a real game, you'd handle lives/health.
      }
    }
  });

  // Check if all enemies are defeated (win condition)
  if (enemies.filter((enemy) => enemy.active).length === 0) {
    gameRunning = false; // Level Complete!
    alert("You Win! Score: " + score); // Simple win message
  }
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 8, 20);
}

function gameOverScreen() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)"; // Semi-transparent black overlay
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 40);
}

// Game Loop
function gameLoop() {
  if (!gameRunning) {
    gameOverScreen();
    return; // Stop the game loop
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  movePlayer();
  moveProjectiles();
  moveEnemies();
  makeEnemiesDive(); // Make enemies dive periodically - Galaga Innovation!
  moveDivingEnemies(); // Move enemies that are diving
  checkCollisions();

  createPlayer();
  drawEnemies();
  drawProjectiles();
  drawScore();

  requestAnimationFrame(gameLoop); // Call gameLoop again for next frame
}

// Initialize game
createEnemies();
gameLoop(); // Start the game loop
