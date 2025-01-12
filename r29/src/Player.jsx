import { horizontal, vertical } from "../utils/constants";

export function player(cv) {
  const playerObj = cv.add([
    cv.pos(320, 80),
    cv.sprite("player"),
    cv.area(),
    cv.anchor("center"),
    cv.body(),
    cv.timer(),
    cv.state("Idle", ["Idle", "Moving", "Rolling", "Attacking"]),
    "player", // Tag to identify the player
    {
      dir: cv.vec2(0, 0),
      speed: 300,
      rollDistance: 100,
      rollCDR: false,
      health: 100, // Player health component
    },
  ]);

  const itemObj = playerObj.add([cv.sprite("gun"), cv.pos(55, 0)]);

  playerObj.onUpdate(() => {
    const mousePos = cv.mousePos();
    const playerPos = playerObj.pos;

    const angle = mousePos.sub(playerPos).angle();
    playerObj.angle = angle;
  });
  itemObj.onMousePress("left", () => {
    function spawnBullet(p) {
      itemObj.add([
        cv.sprite("pellet"),
        cv.pos(40, 0),
        cv.scale(0.5),
        cv.anchor("center"),
        cv.move(0, 100),
      ]);
    }
    spawnBullet(itemObj.pos.add(10, 0));
  });

  // STATES ENTER
  playerObj.onStateEnter("Idle", () => {
    console.log("Entered Idle State.");
  });

  playerObj.onStateEnter("Moving", () => {
    console.log("Entered Moving State.");
  });

  playerObj.onStateEnter("Rolling", () => {
    console.log("Entered Rolling State.");
  });

  // ROLLING AROUND
  playerObj.onStateTransition("Moving", "Rolling", () => {
    if (playerObj.rollCDR) return;

    playerObj.rollCDR = true;
    playerObj.wait(0.5, () => {
      playerObj.rollCDR = false;
    });
    if (playerObj.dir.x && playerObj.dir.y) {
      playerObj.tween(
        playerObj.pos,
        playerObj.pos.add(
          playerObj.dir.scale(playerObj.rollDistance * diagonalFactor)
        ),
        0.3,
        (p) => {
          playerObj.pos = p;
        },
        cv.easings.easeOutQuad
      );
      return;
    }
    playerObj.tween(
      playerObj.pos,
      playerObj.pos.add(playerObj.dir.scale(playerObj.rollDistance)),
      0.3,
      (p) => {
        playerObj.pos = p;
      },
      cv.easings.easeOutQuad
    );
  });

  // STATE UPDATE
  playerObj.onStateUpdate("Moving", () => {
    if (cv.isKeyDown("a")) {
      playerObj.dir.x = -1;
    }
    if (cv.isKeyDown("d")) {
      playerObj.dir.x = 1;
    }
    if (cv.isKeyDown("w")) {
      playerObj.dir.y = -1;
    }
    if (cv.isKeyDown("s")) {
      playerObj.dir.y = 1;
    }

    // Diagonal Movement
    if (playerObj.dir.x && playerObj.dir.y) {
      playerObj.move(playerObj.dir.scale(diagonalFactor * playerObj.speed));
      return;
    }
    playerObj.move(playerObj.dir.scale(playerObj.speed));
  });

  // ON KEY CLICK
  playerObj.onKeyDown([...horizontal.keys, ...vertical.keys], (key) => {
    if (playerObj.state !== "Moving") playerObj.enterState("Moving");
  });

  playerObj.onKeyPress("space", () => {
    if (playerObj.state !== "Rolling") playerObj.enterState("Rolling");
  });

  playerObj.onKeyRelease([...horizontal.keys, ...vertical.keys], (key) => {
    if (horizontal[key]) {
      playerObj.dir.x = 0;
    }
    if (vertical[key]) {
      playerObj.dir.y = 0;
    }
    if (!playerObj.dir.x && !playerObj.dir.y) playerObj.enterState("Idle");
  });
}

// Collision Handling -  Place this code in your scene's `init` or a setup area.
export function setupInteractions(cv) {
  cv.onCollide("player", "healthPack", (player, healthPack) => {
    if (player.health !== undefined && healthPack.healAmount !== undefined) {
      player.health += healthPack.healAmount; // Heal the player

      // Cap health at 100
      if (player.health > 100) {
        player.health = 100;
      }
      console.log(`Player healed. Current health: ${player.health}`);
      cv.destroy(healthPack); // Destroy the health pack after pickup
    }
  });
}
