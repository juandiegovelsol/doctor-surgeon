const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

// Game settings
const playerSpeed = 5;
const playerWidth = 30;
const playerHeight = 20;
let playerX = canvas.width / 2 - playerWidth / 2;
const playerY = canvas.height - playerHeight - 20;

const enemyRows = 4;
const enemiesPerRow = 8;
const enemyWidth = 24;
const enemyHeight = 16;
const enemyPaddingX = 40;
const enemyPaddingY = 30;
const enemyStartY = 50;
const enemySpeedX = 1;
const enemySpeedY = enemyHeight * 2;
let enemies = [];
let enemyDirection = 1; // 1 for right, -1 for left

const projectileWidth = 4;
const projectileHeight = 10;
const projectileSpeed = 7;
let playerProjectiles = [];
let enemyProjectiles = [];
const enemyFireRate = 0.003; // Reduced enemy fire rate

let score = 0;
let gameRunning = true;

// --- Functions ---

function initializeEnemies() {
  enemies = [];
  for (let row = 0; row < enemyRows; row++) {
    for (let col = 0; col < enemiesPerRow; col++) {
      enemies.push({
        x: col * enemyPaddingX + enemyPaddingX / 2,
        y: row * enemyPaddingY + enemyStartY,
        alive: true,
      });
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "lime";
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

function drawEnemies() {
  ctx.fillStyle = "red";
  enemies.forEach((enemy) => {
    if (enemy.alive) {
      ctx.fillRect(
        enemy.x - enemyWidth / 2,
        enemy.y - enemyHeight / 2,
        enemyWidth,
        enemyHeight
      );
    }
  });
}

function drawProjectiles() {
  ctx.fillStyle = "white";
  playerProjectiles.forEach((projectile) => {
    ctx.fillRect(
      projectile.x - projectileWidth / 2,
      projectile.y,
      projectileWidth,
      projectileHeight
    );
  });
  ctx.fillStyle = "yellow";
  enemyProjectiles.forEach((projectile) => {
    ctx.fillRect(
      projectile.x - projectileWidth / 2,
      projectile.y,
      projectileWidth,
      projectileHeight
    );
  });
}

function updatePlayer() {
  // Player movement is handled in input event listeners
  // Boundaries
  if (playerX < 0) playerX = 0;
  if (playerX + playerWidth > canvas.width)
    playerX = canvas.width - playerWidth;
}

function updateEnemies() {
  let reachedEdge = false;
  enemies.forEach((enemy) => {
    if (enemy.alive) {
      enemy.x += enemySpeedX * enemyDirection;
      if (
        enemy.x - enemyWidth / 2 < 0 ||
        enemy.x + enemyWidth / 2 > canvas.width
      ) {
        reachedEdge = true;
      }
    }
  });

  if (reachedEdge) {
    enemyDirection *= -1; // Reverse direction
    enemies.forEach((enemy) => {
      if (enemy.alive) {
        enemy.y += enemySpeedY;
      }
    });
  }

  // Enemy firing projectiles
  if (Math.random() < enemyFireRate) {
    const aliveEnemies = enemies.filter((enemy) => enemy.alive);
    if (aliveEnemies.length > 0) {
      const randomEnemy =
        aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
      enemyProjectiles.push({
        x: randomEnemy.x,
        y: randomEnemy.y + enemyHeight / 2,
      });
    }
  }
}

function updateProjectiles() {
  // Player projectiles
  playerProjectiles.forEach((projectile) => {
    projectile.y -= projectileSpeed;
  });
  playerProjectiles = playerProjectiles.filter(
    (projectile) => projectile.y + projectileHeight > 0
  ); // Remove off-screen projectiles

  // Enemy projectiles
  enemyProjectiles.forEach((projectile) => {
    projectile.y += projectileSpeed;
  });
  enemyProjectiles = enemyProjectiles.filter(
    (projectile) => projectile.y < canvas.height
  ); // Remove off-screen projectiles
}

function checkCollisions() {
  // Player projectiles vs Enemies
  playerProjectiles.forEach((projectile) => {
    enemies.forEach((enemy) => {
      if (
        enemy.alive &&
        projectile.x > enemy.x - enemyWidth / 2 &&
        projectile.x < enemy.x + enemyWidth / 2 &&
        projectile.y > enemy.y - enemyHeight / 2 &&
        projectile.y < enemy.y + enemyHeight / 2
      ) {
        enemy.alive = false;
        projectile.hit = true; // Mark projectile for removal
        score += 100;
        scoreDisplay.textContent = "Score: " + score;
      }
    });
  });
  playerProjectiles = playerProjectiles.filter((projectile) => !projectile.hit); // Remove hit projectiles

  // Enemy projectiles vs Player
  enemyProjectiles.forEach((projectile) => {
    if (
      projectile.x > playerX &&
      projectile.x < playerX + playerWidth &&
      projectile.y > playerY &&
      projectile.y < playerY + playerHeight
    ) {
      gameOver(); // Game Over if player is hit
    }
  });

  // Check if all enemies are defeated
  if (enemies.filter((enemy) => enemy.alive).length === 0) {
    gameWin(); // Game Win if no enemies are alive
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameOver() {
  gameRunning = false;
  alert("Game Over! Score: " + score);
  // Optionally, reset game here or redirect to a game over screen
}

function gameWin() {
  gameRunning = false;
  alert("You Win! Score: " + score);
  // Optionally, go to next level or game win screen
}

function gameLoop() {
  if (!gameRunning) return; // Stop loop if game is not running

  update();
  draw();

  requestAnimationFrame(gameLoop);
}

function update() {
  updatePlayer();
  updateEnemies();
  updateProjectiles();
  checkCollisions();
}

function draw() {
  clearCanvas();
  drawPlayer();
  drawEnemies();
  drawProjectiles();
}

// --- Input Handling ---
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    playerX -= playerSpeed;
  } else if (event.key === "ArrowRight") {
    playerX += playerSpeed;
  } else if (event.key === "m") {
    // Changed to check for 'm' key
    console.log("M key pressed!"); // Changed console log message
    playerProjectiles.push({
      x: playerX + playerWidth / 2,
      y: playerY,
    });
  }
});

// --- Initialize and Start Game ---
initializeEnemies();
gameLoop();
