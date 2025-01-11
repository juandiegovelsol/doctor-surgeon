document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle("flipped"); // Use toggle to flip back as well if needed for testing

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch =
      firstCard.dataset.cardSymbol === secondCard.dataset.cardSymbol;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  cards.forEach((card) => card.addEventListener("click", flipCard));
});
