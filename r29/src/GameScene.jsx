// ... in your GameScene or main game file ...
import * as Kaplay from "kaplay";
import Player from "./Player"; // Assuming you have a Player class
import HealthPack from "./HealthPack";

class GameScene extends Kaplay.Scene {
  constructor(game) {
    super(game);
  }

  init() {
    super.init();

    // Create a player object (assuming you have a Player class)
    this.player = new Player(100, 100); // Starting position for player
    this.player.isPlayer = true; // Mark the player object
    this.player.health = 50; // Initial player health (example)
    this.addGameObject(this.player);

    // Create a health pack
    const healthPack = new HealthPack(200, 200); // Position of the health pack
    this.addGameObject(healthPack);

    // Set up collision detection (assuming you want basic AABB collision for now)
    this.enableCollisionDetection(); // Enable collision detection in the scene
  }

  update(dt, game) {
    super.update(dt, game);
    // ... any other scene update logic ...
  }

  draw(ctx) {
    super.draw(ctx);
    // ... any other scene drawing logic ...
  }
}

export default GameScene;
