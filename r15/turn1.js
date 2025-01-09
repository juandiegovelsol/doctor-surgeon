/**
 * Boss AI Script
 */
class BossAI {
  /**
   * Constructor for the Boss AI.
   * @param {object} boss - An object representing the boss with properties like currentHealth and access to attack functions.
   * @param {object} player - An object representing the player with properties like currentPosition.
   * @param {number} bossAttackRange - The base range for the boss to consider attacking.
   */
  constructor(boss, player, bossAttackRange = 5) {
    this.boss = boss;
    this.player = player;
    this.bossAttackRange = bossAttackRange; // You might use this for general proximity checks
    this.attackRanges = {
      attack1: 3, // Range for attack 1
      attack2: 6, // Range for attack 2
      attack3: 4, // Range for attack 3
      attack4: 8, // Range for attack 4
    };
  }

  /**
   * Determines the current health level of the boss.
   * @returns {string} - The health level ('high', 'medium', 'low', 'critical').
   */
  getHealthLevel() {
    const healthPercentage = this.boss.currentHealth / this.boss.maxHealth;
    if (healthPercentage > 0.75) {
      return "high";
    } else if (healthPercentage > 0.5) {
      return "medium";
    } else if (healthPercentage > 0.25) {
      return "low";
    } else {
      return "critical";
    }
  }

  /**
   * Calculates the distance between the boss and the player.
   * @returns {number} - The distance between the boss and the player.
   */
  getPlayerDistance() {
    // Assuming boss and player have x and y coordinates for their position
    const dx = this.player.currentPosition.x - this.boss.currentPosition.x;
    const dy = this.player.currentPosition.y - this.boss.currentPosition.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Checks if the player is within the range of a specific attack.
   * @param {string} attackName - The name of the attack.
   * @returns {boolean} - True if the player is in range, false otherwise.
   */
  isPlayerInRange(attackName) {
    const distance = this.getPlayerDistance();
    return distance <= this.attackRanges[attackName];
  }

  /**
   * Executes the boss's attack based on health level and player proximity.
   */
  performAttack() {
    const healthLevel = this.getHealthLevel();
    const distanceToPlayer = this.getPlayerDistance();

    // Example attack functions - replace with your actual attack logic
    const attack1 = () => console.log("Boss uses Attack 1!");
    const attack2 = () => console.log("Boss uses Attack 2!");
    const attack3 = () => console.log("Boss uses Attack 3!");
    const attack4 = () => console.log("Boss uses Attack 4!");

    switch (healthLevel) {
      case "high":
        // Prioritize attack1 or attack2
        if (this.isPlayerInRange("attack1")) {
          attack1();
          return;
        } else if (this.isPlayerInRange("attack2")) {
          attack2();
          return;
        }
        break;
      case "medium":
        // Use attack2 or attack3
        if (this.isPlayerInRange("attack2")) {
          attack2();
          return;
        } else if (this.isPlayerInRange("attack3")) {
          attack3();
          return;
        }
        break;
      case "low":
        // Use attack3 or attack4
        if (this.isPlayerInRange("attack3")) {
          attack3();
          return;
        } else if (this.isPlayerInRange("attack4")) {
          attack4();
          return;
        }
        break;
      case "critical":
        // Only use the most powerful attack (attack4) if in range
        if (this.isPlayerInRange("attack4")) {
          attack4();
          return;
        }
        break;
      default:
        console.log("Boss is idle.");
        return;
    }

    console.log("Player is out of range for all available attacks.");
  }

  /**
   * Updates the boss's AI. This function should be called in your game loop.
   */
  update() {
    this.performAttack();
  }
}

// Example usage (assuming you have your boss and player objects defined)
const boss = {
  currentHealth: 75,
  maxHealth: 100,
  currentPosition: { x: 0, y: 0 },
  // ... other boss properties and methods
};

const player = {
  currentPosition: { x: 5, y: 5 },
  // ... other player properties and methods
};

const bossAI = new BossAI(boss, player);

// Example of calling the update function in a game loop
setInterval(() => {
  bossAI.update();
}, 1000); // Update AI every 1 second
