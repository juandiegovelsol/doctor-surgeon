const playerHealthBarFill = document.querySelector(".player-health");
const enemyHealthBarFill1 = document.querySelector(".enemy-health-1");
const enemyHealthBarFill2 = document.querySelector(".enemy-health-2");
const enemyHealthBarFill3 = document.querySelector(".enemy-health-3");
const logMessagesContainer = document.querySelector(".log-messages");
const attackBtn = document.getElementById("attack-btn");
const itemBtn = document.getElementById("item-btn");
const magicBtn = document.getElementById("magic-btn");
const actionMenu = document.getElementById("action-menu");
const magicMenu = document.getElementById("magic-menu");
const magicIceBtn = document.getElementById("magic-ice-btn");
const magicFireBtn = document.getElementById("magic-fire-btn");
const magicLightningBtn = document.getElementById("magic-lightning-btn");
const magicBackBtn = document.getElementById("magic-back-btn");
const enemyEntities = document.querySelectorAll(".enemy"); // Select all enemy entities (now buttons)

let playerHealth = 100;
const enemiesData = [
  // Array of enemy objects
  {
    id: 1,
    name: "Dummy 1",
    element: "water",
    weakness: "lightning",
    health: 100,
    healthBar: enemyHealthBarFill1,
    entityElement: document.getElementById("enemy-1"),
  },
  {
    id: 2,
    name: "Dummy 2",
    element: "fire",
    weakness: "water",
    health: 100,
    healthBar: enemyHealthBarFill2,
    entityElement: document.getElementById("enemy-2"),
  },
  {
    id: 3,
    name: "Dummy 3",
    element: "wind",
    weakness: "fire",
    health: 100,
    healthBar: enemyHealthBarFill3,
    entityElement: document.getElementById("enemy-3"),
  },
];
let selectedEnemy = null;
let playerTurn = true;
let magicTypeSelected = null; // To track selected magic type

const updateHealthBars = () => {
  playerHealthBarFill.style.width = `${playerHealth}%`;
  enemiesData.forEach((enemy) => {
    enemy.healthBar.style.width = `${enemy.health}%`;
    if (enemy.health <= 0) {
      enemy.health = 0;
      enemy.healthBar.style.width = "0%";
      logMessage(`${enemy.name} has been defeated!`);
    }
  });

  if (playerHealth <= 0) {
    playerHealth = 0;
    playerHealthBarFill.style.width = "0%";
    logMessage("Player has been defeated!");
    disableActions();
  }

  if (enemiesData.every((enemy) => enemy.health <= 0)) {
    // Check if all enemies are defeated
    logMessage("All Training Dummies have been defeated! Victory!");
    disableActions();
  }
};

const logMessage = (message) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  logMessagesContainer.prepend(messageElement);
};

const disableActions = () => {
  attackBtn.disabled = true;
  itemBtn.disabled = true;
  magicBtn.disabled = true;
};

const enableActions = () => {
  attackBtn.disabled = false;
  itemBtn.disabled = false;
  magicBtn.disabled = false;
};

const playerAttack = () => {
  if (!playerTurn || !selectedEnemy) return; // Need to select enemy first

  const damage = Math.floor(Math.random() * 20) + 10;
  selectedEnemy.health -= damage;
  if (selectedEnemy.health < 0) selectedEnemy.health = 0;

  logMessage(`Player attacks ${selectedEnemy.name} for ${damage} damage!`);
  updateHealthBars();
  playerTurn = false;
  enemyTurn();
  unselectEnemy(); // Clear selection after attack
};

const playerUseItem = () => {
  if (!playerTurn) return;

  const healAmount = 30;
  playerHealth += healAmount;
  if (playerHealth > 100) playerHealth = 100;

  logMessage(`Player uses an Item and heals for ${healAmount} health!`);
  updateHealthBars();
  playerTurn = false;
  enemyTurn();
};

const playerCastMagic = (magicType) => {
  if (!playerTurn || !selectedEnemy || !magicType) return;

  let magicDamage = 25;
  let effectivenessMessage = "";

  if (selectedEnemy.weakness === magicType) {
    magicDamage *= 2; // Double damage on weakness
    effectivenessMessage = "It's super effective!";
  }

  selectedEnemy.health -= magicDamage;
  if (selectedEnemy.health < 0) selectedEnemy.health = 0;

  logMessage(
    `Player casts ${magicType} Magic on ${selectedEnemy.name} and deals ${magicDamage} damage! ${effectivenessMessage}`
  );
  updateHealthBars();
  playerTurn = false;
  enemyTurn();
  unselectEnemy(); // Clear selection after magic
  hideMagicMenu(); // Hide magic menu after casting
  showActionMenu(); // Show action menu again
};

const enemyTurn = () => {
  if (enemiesData.every((enemy) => enemy.health <= 0)) return; // Enemies don't act if all are defeated
  logMessage("Training Dummies stand still and do nothing...");
  playerTurn = true;
};

const showActionMenu = () => {
  actionMenu.style.display = "flex";
};

const hideActionMenu = () => {
  actionMenu.style.display = "none";
};

const showMagicMenu = () => {
  magicMenu.style.display = "block";
  hideActionMenu();
};

const hideMagicMenu = () => {
  magicMenu.style.display = "none";
  showActionMenu();
};

const selectEnemy = (enemyElement) => {
  if (selectedEnemy) {
    unselectEnemy(); // Unselect previously selected enemy
  }
  const enemyId = parseInt(enemyElement.dataset.enemyId);
  selectedEnemy = enemiesData.find((enemy) => enemy.id === enemyId);
  enemyElement.classList.add("selected"); // Add 'selected' class to highlight
};

const unselectEnemy = () => {
  if (selectedEnemy) {
    selectedEnemy.entityElement.classList.remove("selected"); // Remove highlight
    selectedEnemy = null;
  }
};

// Event Listeners

attackBtn.addEventListener("click", playerAttack);
itemBtn.addEventListener("click", playerUseItem);
magicBtn.addEventListener("click", showMagicMenu); // Show magic menu on 'Magic' click

magicIceBtn.addEventListener("click", () => {
  playerCastMagic("ice");
});
magicFireBtn.addEventListener("click", () => {
  playerCastMagic("fire");
});
magicLightningBtn.addEventListener("click", () => {
  playerCastMagic("lightning");
});
magicBackBtn.addEventListener("click", hideMagicMenu); // Hide magic menu on 'Back'

enemyEntities.forEach((enemyElement) => {
  // Event listener for each enemy
  enemyElement.addEventListener("click", () => {
    selectEnemy(enemyElement); // Select enemy when clicked
  });
});

// Initial setup
updateHealthBars();
logMessage("Battle Start! Select an enemy to attack.");
