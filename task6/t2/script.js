document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.querySelector(".game-board");
  const timerDisplay = document.getElementById("time");
  const playAgainButton = document.getElementById("playAgain");
  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let timeLeft = 90; // Seconds
  let timerInterval;
  let gameActive = true; // Flag to track if the game is active

  // Function to generate a shuffled array of numbers
  function generateCardNumbers() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return [...numbers, ...numbers].sort(() => Math.random() - 0.5);
  }

  // Function to create a card element
  function createCard(number) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${number}</div>
            </div>
        `;
    card.dataset.number = number;
    card.addEventListener("click", flipCard);
    return card;
  }

  // Function to format time in MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  // Function to update the timer display
  function updateTimer() {
    timerDisplay.textContent = formatTime(timeLeft);
  }

  // Function to start the timer
  function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    timerInterval = setInterval(() => {
      if (gameActive) {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          endGame();
        }
      }
    }, 200);
  }

  // Function to flip a card
  function flipCard() {
    if (!gameActive) return; // Do nothing if the game is over

    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
      this.classList.add("flipped");
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        const card1 = flippedCards[0];
        const card2 = flippedCards[1];

        if (card1.dataset.number === card2.dataset.number) {
          // Match found
          matched();
        } else {
          // No match
          unmatched();
        }
      }
    }
  }

  // Function called when a pair is matched
  function matched() {
    matchedPairs++;
    timeLeft += 10;
    updateTimer();
    flippedCards = [];
    if (matchedPairs === 10) {
      clearInterval(timerInterval);
      endGame(true); // Indicate win
    }
  }

  // Function called when a pair is not matched
  function unmatched() {
    gameActive = false; // Pause game to prevent further flips during delay
    setTimeout(() => {
      flippedCards.forEach((card) => card.classList.remove("flipped"));
      flippedCards = [];
      gameActive = true; // Resume game
    }, 500);
    timeLeft = Math.max(0, timeLeft - 2); // Ensure time doesn't go below 0
    updateTimer();
  }

  // Function to end the game
  function endGame(win = false) {
    gameActive = false;
    // Disable clicking on remaining cards
    cards.forEach((card) => card.classList.add("disabled"));
    playAgainButton.style.display = "block";
    if (!win) {
      alert("Time is up! Game Over.");
    } else {
      alert("Congratulations! You found all the pairs!");
    }
  }

  // Function to reset the game
  function resetGame() {
    gameActive = true;
    matchedPairs = 0;
    timeLeft = 90;
    updateTimer();
    flippedCards = [];
    clearInterval(timerInterval);

    // Clear the game board
    gameBoard.innerHTML = "";
    cards = [];

    // Generate and display new cards
    const cardNumbers = generateCardNumbers();
    cardNumbers.forEach((number) => {
      const card = createCard(number);
      cards.push(card);
      gameBoard.appendChild(card);
    });

    startTimer();
    playAgainButton.style.display = "none";
  }

  // Initialize the game
  function initializeGame() {
    const cardNumbers = generateCardNumbers();
    cardNumbers.forEach((number) => {
      const card = createCard(number);
      cards.push(card);
      gameBoard.appendChild(card);
    });
    updateTimer();
    startTimer();
  }

  playAgainButton.addEventListener("click", resetGame);

  initializeGame();
});
