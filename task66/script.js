document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("mazeCanvas");
  const ctx = canvas.getContext("2d");
  const gridSize = 20; // Size of each cell in pixels
  const mazeSize = 20; // Maze dimensions (number of cells x number of cells)
  let maze, playerX, playerY, cellSize;

  function generateMaze(size) {
    const grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
    const walls = Array(size)
      .fill(null)
      .map(() =>
        Array(size).fill({
          north: true,
          east: true,
          south: true,
          west: true,
        })
      );
    const visited = Array(size)
      .fill(null)
      .map(() => Array(size).fill(false));
    const stack = [];
    let currentCell = { x: 0, y: 0 };
    visited[0][0] = true;
    stack.push(currentCell);

    while (stack.length > 0) {
      currentCell = stack[stack.length - 1]; // Peek at the top of the stack
      const { x, y } = currentCell;
      const unvisitedNeighbors = getUnvisitedNeighbors(x, y, size, visited);

      if (unvisitedNeighbors.length) {
        const randomNeighbor =
          unvisitedNeighbors[
            Math.floor(Math.random() * unvisitedNeighbors.length)
          ];
        const { nx, ny, direction } = randomNeighbor;

        removeWall(walls, x, y, direction);
        removeWall(walls, nx, ny, getOppositeDirection(direction));

        visited[nx][ny] = true;
        stack.push({ x: nx, y: ny }); // Move to the neighbor
      } else {
        stack.pop(); // Backtrack if no unvisited neighbors
      }
    }
    return walls;
  }

  function getUnvisitedNeighbors(x, y, size, visited) {
    const neighbors = [];
    if (y > 0 && !visited[y - 1][x])
      neighbors.push({ nx: x, ny: y - 1, direction: "north" }); // North
    if (x < size - 1 && !visited[y][x + 1])
      neighbors.push({ nx: x + 1, ny: y, direction: "east" }); // East
    if (y < size - 1 && !visited[y + 1][x])
      neighbors.push({ nx: x, ny: y + 1, direction: "south" }); // South
    if (x > 0 && !visited[y][x - 1])
      neighbors.push({ nx: x - 1, ny: y, direction: "west" }); // West
    return neighbors;
  }

  function getOppositeDirection(direction) {
    switch (direction) {
      case "north":
        return "south";
      case "east":
        return "west";
      case "south":
        return "north";
      case "west":
        return "east";
    }
  }

  function removeWall(walls, x, y, direction) {
    switch (direction) {
      case "north":
        walls[y][x].north = false;
        break;
      case "east":
        walls[y][x].east = false;
        break;
      case "south":
        walls[y][x].south = false;
        break;
      case "west":
        walls[y][x].west = false;
        break;
    }
  }

  function drawMaze(walls, size) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    cellSize = canvas.width / size;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const cellX = x * cellSize;
        const cellY = y * cellSize;

        if (walls[y][x].north) drawLine(cellX, cellY, cellX + cellSize, cellY); // North
        if (walls[y][x].east)
          drawLine(cellX + cellSize, cellY, cellX + cellSize, cellY + cellSize); // East
        if (walls[y][x].south)
          drawLine(cellX, cellY + cellSize, cellX + cellSize, cellY + cellSize); // South
        if (walls[y][x].west) drawLine(cellX, cellY, cellX, cellY + cellSize); // West
      }
    }
  }

  function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function drawPlayer(x, y) {
    const playerSize = cellSize / 2;
    ctx.fillStyle = "red";
    ctx.fillRect(
      x * cellSize + cellSize / 4,
      y * cellSize + cellSize / 4,
      playerSize,
      playerSize
    );
  }

  function movePlayer(direction) {
    let newX = playerX;
    let newY = playerY;

    switch (direction) {
      case "up":
        if (!maze[playerY][playerX].north) newY--;
        break;
      case "down":
        if (!maze[playerY][playerX].south) newY++;
        break;
      case "left":
        if (!maze[playerY][playerX].west) newX--;
        break;
      case "right":
        if (!maze[playerY][playerX].east) newX++;
        break;
    }

    if (newX >= 0 && newX < mazeSize && newY >= 0 && newY < mazeSize) {
      playerX = newX;
      playerY = newY;
    } else if (newX < 0 || newX >= mazeSize || newY < 0 || newY >= mazeSize) {
      alert("You escaped the maze!");
      initGame(); // Restart the game
      return;
    }

    draw();
  }

  function initGame() {
    maze = generateMaze(mazeSize);
    playerX = 0; // Start at top-left
    playerY = 0; // Start at top-left
    draw();
  }

  function draw() {
    drawMaze(maze, mazeSize);
    drawPlayer(playerX, playerY);
  }

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        movePlayer("up");
        break;
      case "s":
      case "ArrowDown":
        movePlayer("down");
        break;
      case "a":
      case "ArrowLeft":
        movePlayer("left");
        break;
      case "d":
      case "ArrowRight":
        movePlayer("right");
        break;
    }
  });

  initGame();
});
