import { diagonalFactor } from "../utils/constants";

export function player(cv) {
  const playerObj = cv.add([
    cv.pos(320, 80),
    cv.sprite("player"),
    cv.area(),
    cv.body(),
    "player",
    {
      speed: 300,
      state: "idle", // Initialize the state
    },
  ]);

  // Movement
  playerObj.onUpdate(function callback() {
    const dir = cv.vec2(0, 0);
    if (cv.isKeyDown("left")) dir.x = -1;
    if (cv.isKeyDown("right")) dir.x = 1;
    if (cv.isKeyDown("up")) dir.y = -1;
    if (cv.isKeyDown("down")) dir.y = 1;

    // Check if the player is moving
    if (dir.x !== 0 || dir.y !== 0) {
      this.state = "moving";
    } else {
      this.state = "idle";
    }

    // Diagonal Movement
    if (dir.x && dir.y) {
      this.move(dir.scale(diagonalFactor * this.speed));
      return;
    }
    this.move(dir.scale(this.speed));
  });

  // You can access the state like this:
  playerObj.onUpdate(() => {
    if (playerObj.state === "idle") {
      // Do something when the player is idle
      // console.log('Player is idle');
    } else if (playerObj.state === "moving") {
      // Do something when the player is moving
      // console.log('Player is moving');
    }
  });

  return playerObj; // It's good practice to return the created object
}
