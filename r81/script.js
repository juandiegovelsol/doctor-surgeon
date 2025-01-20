// --- Game State ---
let characters = [
  {
    id: "character1",
    name: "Hero 1",
    speed: 50,
    hp: 100,
    maxHp: 100,
    atb: 0,
    isPlayer: true,
  },
  {
    id: "character2",
    name: "Hero 2",
    speed: 40,
    hp: 100,
    maxHp: 100,
    atb: 0,
    isPlayer: true,
  },
  {
    id: "character3",
    name: "Hero 3",
    speed: 60,
    hp: 100,
    maxHp: 100,
    atb: 0,
    isPlayer: true,
  },
  {
    id: "enemy1",
    name: "Goblin 1",
    speed: 50,
    hp: 100,
    maxHp: 100,
    atb: 0,
    isPlayer: false,
    magicPoints: 50,
    maxMagicPoints: 50,
  }, // Enemies can have magic points now
  {
    id: "enemy2",
    name: "Goblin 2",
    speed: 50,
    hp: 100,
    maxHp: 100,
    atb: 0,
    isPlayer: false,
    magicPoints: 50,
    maxMagicPoints: 50,
  }, // Enemies can have magic points now
];

let baseFillRate = 10; // Base amount the ATB gauge fills per tick
let atbMax = 100; // Maximum value for the ATB gauge (100% full)
let combatActive = true; // Flag to indicate if combat is ongoing
let currentTurnCharacter = null; // ID of the character whose turn it is
let atbPaused = false; // Flag to pause ATB filling during action selection

// --- HTML Elements ---
const partyArea = document.getElementById("party-area"); // Container for player characters in the UI
const enemyArea = document.getElementById("enemy-area"); // Container for enemy characters in the UI
const actionMenuContainer = document.getElementById("action-menu-container"); // Container for the action menu
const combatLog = document.getElementById("combat-log"); // Container for the combat log messages
let atbBarElements = {}; // Object to store references to ATB bar HTML elements, keyed by character ID
let hpBarElements = {}; // Object to store references to HP bar HTML elements, keyed by character ID

// --- Initialize UI ---
function initializeCombatUI() {
  partyArea.innerHTML = ""; // Clear any existing content in the party area
  enemyArea.innerHTML = ""; // Clear any existing content in the enemy area
  characters.forEach((char) => {
    // Loop through each character in the characters array
    const panel = document.createElement("div"); // Create a div element for the character panel
    panel.classList.add("character-panel"); // Add the class 'character-panel' for styling
    panel.id = `${char.id}-panel`; // Set the ID of the panel to character ID for reference

    const representation = document.createElement("div"); // Create a div for character representation (shape)
    representation.classList.add(
      char.isPlayer ? "character-representation" : "enemy-representation"
    ); // Apply different class based on player/enemy
    panel.appendChild(representation); // Add representation to the panel

    const nameDisplay = document.createElement("div"); // Create a div to display the character's name
    nameDisplay.classList.add(char.isPlayer ? "character-name" : "enemy-name"); // Apply different class based on player/enemy
    nameDisplay.textContent = char.name; // Set the text content to the character's name
    panel.appendChild(nameDisplay); // Add name display to the panel

    const hpContainer = document.createElement("div"); // Container for the HP bar
    hpContainer.classList.add("hp-container"); // Add class 'hp-container' for styling
    const hpBar = document.createElement("div"); // The actual HP bar element
    hpBar.classList.add("hp-bar"); // Add class 'hp-bar' for styling
    hpBar.style.width = `${(char.hp / char.maxHp) * 100}%`; // Set initial width based on current HP
    hpContainer.appendChild(hpBar); // Add HP bar to the HP container
    panel.appendChild(hpContainer); // Add HP container to the panel
    hpBarElements[char.id] = hpBar; // Store HP bar element in the hpBarElements object

    if (char.isPlayer) {
      // Only create ATB bar for player characters
      const atbContainer = document.createElement("div"); // Container for the ATB bar
      atbContainer.classList.add("atb-container"); // Add class 'atb-container' for styling
      const atbBar = document.createElement("div"); // The actual ATB bar element
      atbBar.classList.add("atb-bar"); // Add class 'atb-bar' for styling
      atbBar.style.width = "0%"; // Initialize ATB bar width to 0%
      atbContainer.appendChild(atbBar); // Add ATB bar to ATB container
      panel.appendChild(atbContainer); // Add ATB container to the panel
      atbBarElements[char.id] = atbBar; // Store ATB bar element in the atbBarElements object
      partyArea.appendChild(panel); // Add the player character panel to the party area
    } else {
      enemyArea.appendChild(panel); // Add the enemy character panel to the enemy area
    }
  });
}

// --- Game Loop ---
let gameLoopInterval = setInterval(updateATB, 50); // Set interval to run updateATB function every 50 milliseconds (adjust for speed)

function updateATB() {
  if (!combatActive || atbPaused) return; // If combat is not active or ATB is paused, exit the function

  for (let char of characters) {
    // Loop through each character in the characters array
    if (char.atb < atbMax && currentTurnCharacter !== char.id) {
      // If ATB is not full and it's not currently this character's turn
      char.atb += baseFillRate * (char.speed / 50); // Increase ATB gauge based on base fill rate and character's speed (scaled to average speed 50)
      if (char.isPlayer && atbBarElements[char.id]) {
        // If it's a player and the ATB bar element exists
        atbBarElements[char.id].style.width = `${(char.atb / atbMax) * 100}%`; // Update visual ATB bar width
      }
      if (char.atb >= atbMax && currentTurnCharacter === null) {
        // If ATB reaches maximum and no one is currently taking a turn
        characterReadyToAct(char); // Character is ready to act
      }
    }
  }
}

function characterReadyToAct(character) {
  currentTurnCharacter = character.id; // Set this character as the one taking the current turn
  atbPaused = true; // Pause ATB filling for all characters

  if (character.isPlayer) {
    // If it's a player character
    displayActionMenu(character); // Show action menu for player
  } else {
    enemyTakeAction(character); // Enemy AI decides action
  }
}

function displayActionMenu(playerCharacter) {
  actionMenuContainer.innerHTML = ""; // Clear any existing content in the action menu container
  actionMenuContainer.style.display = "block"; // Make the action menu visible

  const menuTitle = document.createElement("h3"); // Create a title for the action menu
  menuTitle.textContent = `${playerCharacter.name}'s Turn`; // Set the title text to show whose turn it is
  actionMenuContainer.appendChild(menuTitle); // Add the title to the action menu

  const actions = ["Attack", "Magic", "Item"]; // Array of available actions
  actions.forEach((actionName) => {
    // Loop through each action
    const actionButton = document.createElement("button"); // Create a button for each action
    actionButton.classList.add("action-button"); // Add class 'action-button' for styling
    actionButton.textContent = actionName; // Set the button text to the action name
    actionButton.onclick = () => {
      // Add onclick event listener to the button
      playerActionSelected(actionName, playerCharacter); // Call playerActionSelected function when button is clicked
      actionMenuContainer.style.display = "none"; // Hide the action menu after action is selected
    };
    actionMenuContainer.appendChild(actionButton); // Add the button to the action menu
  });
}

function playerActionSelected(action, playerCharacter) {
  logMessage(`${playerCharacter.name} chose to ${action}!`); // Log the chosen action in the combat log
  executeAction(playerCharacter, action); // Execute the chosen action
}

function enemyTakeAction(enemyCharacter) {
  // Enemy AI Logic: Choose between Attack and Magic, target priority: lowest HP player > random player

  let actionType;
  if (enemyCharacter.magicPoints >= 10 && Math.random() < 0.5) {
    // 50% chance to use magic if MP is sufficient (cost of magic is 10, assumed)
    actionType = "Magic";
  } else {
    actionType = "Attack";
  }

  const target = findTarget(enemyCharacter); // Find a target based on enemy's targeting logic

  if (target) {
    // If a valid target is found
    logMessage(`${enemyCharacter.name} will use ${actionType}!`); // Log enemy's action
    executeAction(enemyCharacter, actionType, enemyCharacter, target); // Execute the enemy's action
  } else {
    logMessage(
      `${enemyCharacter.name} could not find a target and does nothing.`
    ); // Log if no target found
    resetTurn(enemyCharacter); // End enemy's turn even if no action is taken
  }
}

function findTarget(enemyCharacter) {
  // Enemy targeting logic: Priority to player with lowest HP, then random player
  let lowestHPPlayer = null;
  let minHP = Infinity;
  let lowestHPPlayers = []; // Array to hold players with the minimum HP

  characters.forEach((char) => {
    // Loop through all characters to find player targets
    if (char.isPlayer && char.hp > 0) {
      // Consider only alive player characters
      if (char.hp < minHP) {
        // If current player has less HP than current minimum
        minHP = char.hp; // Update minimum HP
        lowestHPPlayers = [char]; // Start a new array with this player as the only lowest HP player
      } else if (char.hp === minHP) {
        // If current player has HP equal to current minimum HP
        lowestHPPlayers.push(char); // Add this player to the array of lowest HP players
      }
    }
  });

  if (lowestHPPlayers.length > 0) {
    // If there are players with the lowest HP
    // Choose a random player from the array of lowest HP players.
    const randomIndex = Math.floor(Math.random() * lowestHPPlayers.length);
    return lowestHPPlayers[randomIndex];
  }

  return null; // No valid target found (e.g., all players defeated)
}

function executeAction(
  actingCharacter,
  actionType,
  attacker = actingCharacter,
  target = null
) {
  // Executes the chosen action, calculates damage/heal, updates HP, and handles action-specific logic

  if (!target) {
    // If no target is specified (or target is invalid somehow)
    if (actingCharacter.isPlayer) {
      // If it's a player action without a specified target
      target = findEnemyTarget(); // Player targets a random alive enemy if no target specified.
    } else {
      target = findTarget(actingCharacter); // Enemy targets player based on AI
      if (!target) {
        // No target found (e.g., all players defeated), end combat
        endCombat();
        return; // Exit execution if no target for enemy and combat ends
      }
    }
  }

  if (!target || target.hp <= 0) {
    // If target is invalid or already defeated
    logMessage("No valid target for action!"); // Log message about invalid target
    resetTurn(actingCharacter); // Reset the turn for the acting character
    return; // Exit the function
  }

  let damage = 0; // Variable to store damage value
  let heal = 0; // Variable to store heal value

  switch (
    actionType // Switch statement based on the action type
  ) {
    case "Attack":
      damage = Math.floor(Math.random() * (30 - 17 + 1)) + 17; // Calculate random damage between 17 and 30
      logMessage(
        `${actingCharacter.name} attacks ${target.name} for ${damage} damage!`
      ); // Log attack message
      target.hp -= damage; // Reduce target's HP by damage amount
      break;
    case "Magic":
      damage = Math.floor(Math.random() * (35 - 25 + 1)) + 25; // Calculate random magic damage between 25 and 35
      logMessage(
        `${actingCharacter.name} casts magic on ${target.name} for ${damage} damage!`
      ); // Log magic attack message
      target.hp -= damage; // Reduce target's HP by magic damage
      if (!actingCharacter.isPlayer) {
        // Enemy uses magic, reduce MP
        enemyCharacter.magicPoints -= 10; // Assumed magic cost is 10
      }
      break;
    case "Item":
      heal = 20; // Item heal amount is fixed at 20
      actingCharacter.hp = Math.min(
        actingCharacter.maxHp,
        actingCharacter.hp + heal
      ); // Heal, capped at max HP
      logMessage(
        `${actingCharacter.name} uses an item and heals for ${heal} HP!`
      ); // Log item use message
      updateHPBar(actingCharacter); // Update the HP bar of the character who used the item
      resetTurn(actingCharacter); // Item usage ends turn immediately
      checkCombatStatus(); // Check if combat ended after item use
      return; // Return early to skip HP bar update for target (no target HP changed)
    default:
      logMessage("Invalid action!"); // Log message for invalid action (shouldn't happen in normal flow)
      resetTurn(actingCharacter); // Reset turn for invalid action
      return; // Exit function
  }

  updateHPBar(target); // Update the HP bar of the target character (after taking damage)
  logMessage(`${target.name}'s HP: ${target.hp}`); // Log the target's current HP
  resetTurn(actingCharacter); // Reset the turn for the acting character
  checkCombatStatus(); // Check if the combat has ended after the action
}

function findEnemyTarget() {
  // Simple targeting: Player attacks a random alive enemy
  let aliveEnemies = characters.filter((char) => !char.isPlayer && char.hp > 0); // Filter out defeated enemies
  if (aliveEnemies.length > 0) {
    // If there are alive enemies
    return aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; // Return a random enemy from the alive enemies array
  }
  return null; // No enemies alive, return null
}

function updateHPBar(character) {
  // Updates the visual HP bar based on the character's current HP
  const hpBar = hpBarElements[character.id]; // Get the HP bar element for the character
  if (hpBar) {
    // If the HP bar element exists
    const percentage = Math.max(0, (character.hp / character.maxHp) * 100); // Calculate the percentage of HP, ensure it's not negative
    hpBar.style.width = `${percentage}%`; // Set the width of the HP bar to reflect the HP percentage
  }
}

function resetTurn(actingCharacter) {
  // Resets ATB and turn-related variables for the character who just acted
  actingCharacter.atb = 0; // Reset the character's ATB gauge to 0
  if (actingCharacter.isPlayer && atbBarElements[actingCharacter.id]) {
    // If it's a player and ATB bar element exists
    atbBarElements[actingCharacter.id].style.width = "0%"; // Reset ATB bar visually to 0%
  }
  currentTurnCharacter = null; // Reset the current turn character to null, allowing next character to act
  atbPaused = false; // Resume ATB filling for all characters
}

function checkCombatStatus() {
  // Checks if all players or all enemies are defeated and ends combat if necessary
  const alivePlayers = characters.filter(
    (char) => char.isPlayer && char.hp > 0
  ); // Filter alive players
  const aliveEnemies = characters.filter(
    (char) => !char.isPlayer && char.hp > 0
  ); // Filter alive enemies

  if (alivePlayers.length === 0) {
    // If no players are alive
    logMessage("Party defeated! Game Over."); // Log game over message
    endCombat(); // End the combat
  } else if (aliveEnemies.length === 0) {
    // If no enemies are alive
    logMessage("Enemies defeated! Victory!"); // Log victory message
    endCombat(); // End the combat
  }
}

function endCombat() {
  // Ends the combat, stops the game loop, and logs combat end message
  combatActive = false; // Set combatActive flag to false
  clearInterval(gameLoopInterval); // Stop the game loop interval
  logMessage("Combat ended."); // Log message indicating combat has ended
}

function logMessage(message) {
  // Adds a message to the combat log in the UI
  const messageElement = document.createElement("p"); // Create a paragraph element for the message
  messageElement.textContent = message; // Set the text content of the paragraph to the message
  combatLog.appendChild(messageElement); // Append the message paragraph to the combat log container
  combatLog.scrollTop = combatLog.scrollHeight; // Scroll the combat log to the bottom to show the latest message
}

// --- Start Game ---
function startGame() {
  logMessage("Combat Started!"); // Log combat start message
  initializeCombatUI(); // Initialize the combat UI
}

startGame(); // Call startGame function to begin the combat
