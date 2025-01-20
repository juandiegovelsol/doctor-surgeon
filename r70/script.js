const canvas = document.getElementById("brickBreakerCanvas");
const ctx = canvas.getContext("2d");

// Game variables
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - paddleHeight - ballRadius - 10; // Initial Y position, same as start position
let ballSpeedX = 0; // Ball starts stationary horizontally
let ballSpeedY = 0; // Ball starts stationary vertically
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;
let gameStarted = false; // To control game start

// Brick variables (same)
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// Input handling (modified keyDownHandler to start game)
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if (!gameStarted && (e.key === " " || e.code === "Space")) {
    // START GAME ON SPACE
    startGame();
  }
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    ballSpeedX = 2; // You can randomize this if you want horizontal variation on start
    ballSpeedY = -2; // Start moving upwards
    ballY = canvas.height - paddleHeight - ballRadius - 10; // Position ball slightly above paddle on start
    draw(); // Redraw to start animation
  }
}

function collisionDetection() {
  if (!gameStarted) return; // Don't detect collision if game not started

  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (
          ballX > b.x &&
          ballX < b.x + brickWidth &&
          ballY > b.y &&
          ballY < b.y + brickHeight
        ) {
          ballSpeedY = -ballSpeedY;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  if (!gameStarted) {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#DDDDDD"; // Grey ball to indicate not active
    ctx.fill();
    ctx.closePath();
  } else {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD"; // Blue ball when active
    ctx.fill();
    ctx.closePath();
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#FF5733";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  if (gameStarted) {
    // Only update positions and collision if game started
    // Ball and wall collision and game over logic
    if (
      ballX + ballSpeedX > canvas.width - ballRadius ||
      ballX + ballSpeedX < ballRadius
    ) {
      ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballSpeedY < ballRadius) {
      ballSpeedY = -ballSpeedY;
    } else if (ballY + ballSpeedY > canvas.height - ballRadius - paddleHeight) {
      if (ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballSpeedY = -ballSpeedY;
      } else {
        lives--;
        if (!lives) {
          alert("GAME OVER");
          document.location.reload();
        } else {
          ballX = canvas.width / 2;
          ballY = canvas.height - paddleHeight - ballRadius - 10; // Reset ball to starting position on life loss too
          ballSpeedX = 0; // Stop ball when life lost
          ballSpeedY = 0;
          gameStarted = false; // Set gameStarted to false when life lost too, to wait for next spacebar
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }

    // Paddle movement
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    }
    if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }
  } else {
    // If game not started, display "Press Space" message
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Press SPACE to Start", canvas.width / 2, canvas.height / 2);
  }

  requestAnimationFrame(draw);
}

// Initial draw (before game starts)
draw(); // Call draw once to render initial state and "Press SPACE" message
