// game.js - Rename this file to something like 'dragon-breath-game.js' for clarity

const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const values = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 10,
  Q: 10,
  K: 10,
  A: 11, // Ace is initially 11
};
let deck = []; // Deck should be scoped within the game function/class
let playerHand = []; // Hands should be scoped within the game function/class
let dealerHand = []; // Hands should be scoped within the game function/class
let betAmount = 10; // Fixed bet for now
let gameStarted = false; // Game state should be scoped

// DOM elements - These should be passed in or selected within the game function if you want multiple instances or separate scenes
const gameMessages = document.getElementById("game-messages");
const dealerCardsDiv = document.getElementById("dealer-cards");
const playerCardsDiv = document.getElementById("player-cards");
const dealerHandValueSpan = document.getElementById("dealer-hand-value");
const playerHandValueSpan = document.getElementById("player-hand-value");
const playerCurrencySpan = document.getElementById("player-currency");
const dealButton = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
const betAmountSpan = document.getElementById("bet-amount");

// Function to create a deck of cards (scoped within game logic)
function createDeck() {
  deck = [];
  for (let rank of ranks) {
    deck.push({ rank: rank, value: values[rank] });
  }
  // In a real game, you'd likely want multiple 'suits' and shuffle the deck
}

// Function to deal a card (scoped within game logic)
function dealCard(hand) {
  if (deck.length === 0) {
    createDeck(); // Reshuffle if deck is empty (for continuous play - in a real game, you might reshuffle less often)
  }
  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck.splice(randomIndex, 1)[0]; // Remove card from deck and get it
  hand.push(card);
  return card;
}

// Function to calculate hand value (scoped within game logic)
function calculateHandValue(hand) {
  let totalValue = 0;
  let aceCount = 0;
  for (let card of hand) {
    totalValue += card.value;
    if (card.rank === "A") {
      aceCount++;
    }
  }
  // Adjust Ace value from 11 to 1 if total > 21 and there are Aces
  while (totalValue > 21 && aceCount > 0) {
    totalValue -= 10;
    aceCount--;
  }
  return totalValue;
}

// Function to display cards in HTML (DOM interaction, keep it here if UI is in same document, otherwise make more generic)
function displayCards(hand, cardsDiv) {
  cardsDiv.innerHTML = ""; // Clear previous cards
  for (let card of hand) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.textContent = card.rank;
    cardsDiv.appendChild(cardElement);
  }
}

// Function to update hand values in HTML (DOM interaction)
function updateHandValues() {
  dealerHandValueSpan.textContent = calculateHandValue(dealerHand);
  playerHandValueSpan.textContent = calculateHandValue(playerHand);
}

// Function to update player currency in HTML (DOM interaction)
function updateCurrencyDisplay(currency) {
  // Pass currency value in
  playerCurrencySpan.textContent = currency;
}

// Function to reset the game for a new round (scoped within game logic)
function resetGame() {
  /* ... same as before, but remove currency update here ... */
  playerHand = [];
  dealerHand = [];
  dealerCardsDiv.innerHTML = "";
  playerCardsDiv.innerHTML = "";
  dealerHandValueSpan.textContent = "0";
  playerHandValueSpan.textContent = "0";
  gameMessages.textContent = "Place your bet and deal.";
  hitButton.disabled = true;
  standButton.disabled = true;
  dealButton.disabled = false;
  gameStarted = false;
}

// Function to handle game end and determine winner (scoped within game logic)
function endGame(playerCurrency, betAmount) {
  // Return updated currency
  gameStarted = false;
  dealButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  let currencyChange = 0; // Track currency change

  if (playerValue > 21) {
    gameMessages.textContent = "You busted! Dealer wins.";
    currencyChange = -betAmount;
  } else if (dealerValue > 21) {
    gameMessages.textContent = "Dealer busted! You win!";
    currencyChange = betAmount;
  } else if (playerValue > dealerValue) {
    gameMessages.textContent = "You win!";
    currencyChange = betAmount;
  } else {
    gameMessages.textContent = "Dealer wins."; // Simplified - push is dealer win
    currencyChange = -betAmount;
  }

  let newCurrency = playerCurrency + currencyChange;

  if (newCurrency <= 0) {
    gameMessages.textContent = "Game Over! You are out of currency.";
    dealButton.disabled = true; // Disable further play
  }

  return newCurrency; // Return the updated currency value
}

// Dealer's turn logic (scoped within game logic)
function dealerTurn(playerCurrency, betAmount) {
  // Pass currency and bet in if needed later
  dealButton.disabled = true;
  hitButton.disabled = true;
  standButton.disabled = true;
  gameMessages.textContent = "Dealer's turn.";

  return new Promise((resolve) => {
    // Return a Promise to handle asynchronous dealer turns
    function dealerHitOrStand() {
      const dealerValue = calculateHandValue(dealerHand);
      if (dealerValue <= 16) {
        gameMessages.textContent = "Dealer hits.";
        dealCard(dealerHand);
        displayCards(dealerHand, dealerCardsDiv);
        updateHandValues();
        if (calculateHandValue(dealerHand) > 21) {
          displayCards(dealerHand, dealerCardsDiv);
          updateHandValues();
          resolve(endGame(playerCurrency, betAmount)); // Resolve promise with updated currency after dealer busts
        } else {
          setTimeout(dealerHitOrStand, 1000); // Dealer's turn with a small delay
        }
      } else {
        gameMessages.textContent = "Dealer stands.";
        resolve(endGame(playerCurrency, betAmount)); // Resolve promise with updated currency after dealer stands
      }
    }
    dealerHitOrStand();
  });
}

// Function to start a new game of Dragon's Breath
export function startGame(initialCurrency) {
  // Export this function to be called from other scripts
  let currentCurrency = initialCurrency;
  updateCurrencyDisplay(currentCurrency); // Initialize currency display

  dealButton.addEventListener("click", handleDealClick);
  hitButton.addEventListener("click", handleHitClick);
  standButton.addEventListener("click", handleStandClick);

  function handleDealClick() {
    if (currentCurrency >= betAmount) {
      resetGame();
      createDeck();
      dealCard(playerHand);
      dealCard(dealerHand);
      dealCard(playerHand);
      dealCard(dealerHand);

      displayCards(playerHand, playerCardsDiv);
      displayCards(dealerHand, dealerCardsDiv);
      updateHandValues();

      hitButton.disabled = false;
      standButton.disabled = false;
      dealButton.disabled = true;
      gameStarted = true;
      gameMessages.textContent = "Hit or Stand?";

      if (calculateHandValue(playerHand) === 21) {
        gameMessages.textContent = "Dragon's Breath! You win!";
        currentCurrency += betAmount;
        updateCurrencyDisplay(currentCurrency);
        endGame(currentCurrency, betAmount); // End game immediately
      }
    } else {
      gameMessages.textContent = "Not enough currency to bet!";
    }
  }

  function handleHitClick() {
    if (gameStarted) {
      dealCard(playerHand);
      displayCards(playerHand, playerCardsDiv);
      updateHandValues();

      if (calculateHandValue(playerHand) > 21) {
        dealerTurn(currentCurrency, betAmount).then((updatedCurrency) => {
          // Dealer turn even if player busts, for game flow
          currentCurrency = updatedCurrency;
          updateCurrencyDisplay(currentCurrency);
        });
      }
    }
  }

  function handleStandClick() {
    if (gameStarted) {
      dealerTurn(currentCurrency, betAmount).then((updatedCurrency) => {
        // Use Promise returned from dealerTurn
        currentCurrency = updatedCurrency;
        updateCurrencyDisplay(currentCurrency);
      });
    }
  }

  return {
    // Return an object with methods or data you might need to access later if you want more control
    getCurrentCurrency: () => currentCurrency, // Example: Getter for currency
    // You could add a method to 'stop' the game or reset it externally if needed
  };
}

// ---  Initial Setup (moved to be called when the game is loaded) ---
// updateCurrencyDisplay(playerCurrency); //  No longer needed here, handled in startGame
