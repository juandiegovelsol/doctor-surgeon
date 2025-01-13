import { diagonalFactor } from "../utils/constants";

export function player(cv) {
  const playerObj = cv.add([
    cv.pos(320, 80),
    cv.sprite("player"),
    cv.area(),
    cv.body(),
    cv.state("idle", ["idle", "moving", "rolling"]), // Initialize state and define available states
    "player",
    {
      speed: 300,
    },
  ]);

  playerObj.onStateEnter("idle", () => {
    // console.log("Player entered idle state");
    // You could potentially trigger an idle animation here
  });

  playerObj.onStateEnter("moving", () => {
    // console.log("Player entered moving state");
    // You could potentially trigger a moving animation here
  });

  playerObj.onStateEnter("rolling", () => {
    // console.log("Player entered rolling state");
    // Implement rolling logic here (e.g., change speed, animation, invulnerability)
  });

  // Movement
  playerObj.onUpdate(function callback() {
    const dir = cv.vec2(0, 0);
    if (cv.isKeyDown("left")) dir.x = -1;
    if (cv.isKeyDown("right")) dir.x = 1;
    if (cv.isKeyDown("up")) dir.y = -1;
    if (cv.isKeyDown("down")) dir.y = 1;

    // Check and update the player's state
    if (dir.x !== 0 || dir.y !== 0) {
      if (playerObj.state.is("idle")) {
        playerObj.enterState("moving");
      }
    } else {
      if (playerObj.state.is("moving")) {
        playerObj.enterState("idle");
      }
    }

    // Example of triggering the 'rolling' state (you'll need to define the actual trigger)
    if (cv.isKeyDown("space") && !playerObj.state.is("rolling")) {
      playerObj.enterState("rolling");
      // Potentially set a timer to exit the rolling state after a duration
      // setTimeout(() => playerObj.enterState("idle"), 500);
    } else if (
      !cv.isKeyDown("space") &&
      playerObj.state.is("rolling") &&
      dir.x === 0 &&
      dir.y === 0
    ) {
      playerObj.enterState("idle");
    } else if (
      !cv.isKeyDown("space") &&
      playerObj.state.is("rolling") &&
      (dir.x !== 0 || dir.y !== 0)
    ) {
      playerObj.enterState("moving");
    }

    // Test for console log in rolling state
    if (playerObj.state.is("rolling") && cv.isKeyDown("space")) {
      console.log("Player is rolling!");
    }

    // Diagonal Movement
    if (dir.x && dir.y) {
      this.move(dir.scale(diagonalFactor * this.speed));
      return;
    }
    this.move(dir.scale(this.speed));
  });

  return playerObj;
}
