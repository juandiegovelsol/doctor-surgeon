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

let deck = [];
let playerHand = [];
let dealerHand = [];
let playerCurrency = 100; // Starting currency
let betAmount = 10; // Fixed bet for now
let gameStarted = false;

// Card ranks and values
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

// Function to create a deck of cards
function createDeck() {
  deck = [];
  for (let rank of ranks) {
    deck.push({ rank: rank, value: values[rank] });
  }
  // In a real game, you'd likely want multiple 'suits' and shuffle the deck
}

// Function to deal a card
function dealCard(hand) {
  if (deck.length === 0) {
    createDeck(); // Reshuffle if deck is empty (for continuous play - in a real game, you might reshuffle less often)
  }
  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck.splice(randomIndex, 1)[0]; // Remove card from deck and get it
  hand.push(card);
  return card;
}

// Function to calculate hand value
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

// Function to display cards in HTML
function displayCards(hand, cardsDiv) {
  cardsDiv.innerHTML = ""; // Clear previous cards
  for (let card of hand) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.textContent = card.rank;
    cardsDiv.appendChild(cardElement);
  }
}

// Function to update hand values in HTML
function updateHandValues() {
  dealerHandValueSpan.textContent = calculateHandValue(dealerHand);
  playerHandValueSpan.textContent = calculateHandValue(playerHand);
}

// Function to update player currency in HTML
function updateCurrencyDisplay() {
  playerCurrencySpan.textContent = playerCurrency;
}

// Function to reset the game for a new round
function resetGame() {
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

// Function to handle game end and determine winner
function endGame() {
  gameStarted = false;
  dealButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  if (playerValue > 21) {
    gameMessages.textContent = "You busted! Dealer wins.";
    playerCurrency -= betAmount;
  } else if (dealerValue > 21) {
    gameMessages.textContent = "Dealer busted! You win!";
    playerCurrency += betAmount;
  } else if (playerValue > dealerValue) {
    gameMessages.textContent = "You win!";
    playerCurrency += betAmount;
  } else {
    gameMessages.textContent = "Dealer wins."; // Simplified - push is dealer win in this version
    playerCurrency -= betAmount;
  }
  updateCurrencyDisplay();

  if (playerCurrency <= 0) {
    gameMessages.textContent = "Game Over! You are out of currency.";
    dealButton.disabled = true; // Disable further play
  }
}

// Dealer's turn logic
function dealerTurn() {
  dealButton.disabled = true;
  hitButton.disabled = true;
  standButton.disabled = true;
  gameMessages.textContent = "Dealer's turn.";

  function dealerHitOrStand() {
    const dealerValue = calculateHandValue(dealerHand);
    if (dealerValue <= 16) {
      gameMessages.textContent = "Dealer hits.";
      dealCard(dealerHand);
      displayCards(dealerHand, dealerCardsDiv);
      updateHandValues();
      if (calculateHandValue(dealerHand) > 21) {
        displayCards(dealerHand, dealerCardsDiv); // Redundant? already in displayCards
        updateHandValues(); // Redundant? already in updateHandValues
        endGame();
      } else {
        setTimeout(dealerHitOrStand, 1000); // Dealer's turn with a small delay for visibility
      }
    } else {
      gameMessages.textContent = "Dealer stands.";
      endGame();
    }
  }

  dealerHitOrStand();
}

// Event listeners for buttons
dealButton.addEventListener("click", () => {
  if (playerCurrency >= betAmount) {
    resetGame();
    createDeck(); // Create a new deck for each game in this simple version
    dealCard(playerHand);
    dealCard(dealerHand);
    dealCard(playerHand);
    dealCard(dealerHand);

    displayCards(playerHand, playerCardsDiv);
    displayCards(dealerHand, dealerCardsDiv); // Dealer cards are visible in this simplified example
    updateHandValues();
    updateCurrencyDisplay();

    hitButton.disabled = false;
    standButton.disabled = false;
    dealButton.disabled = true;
    gameStarted = true;
    gameMessages.textContent = "Hit or Stand?";

    if (calculateHandValue(playerHand) === 21) {
      gameMessages.textContent = "Dragon's Breath! You win!"; // Blackjack - instant win - simplified rules
      playerCurrency += betAmount;
      updateCurrencyDisplay();
      endGame(); // Immediately end the game if player gets Dragon's Breath on deal
    }
  } else {
    gameMessages.textContent = "Not enough currency to bet!";
  }
});

hitButton.addEventListener("click", () => {
  if (gameStarted) {
    dealCard(playerHand);
    displayCards(playerHand, playerCardsDiv);
    updateHandValues();

    if (calculateHandValue(playerHand) > 21) {
      endGame(); // Player busts
    }
  }
});

standButton.addEventListener("click", () => {
  if (gameStarted) {
    dealerTurn(); // Dealer takes their turn
  }
});

// Initial setup
updateCurrencyDisplay(); // Display initial currency
