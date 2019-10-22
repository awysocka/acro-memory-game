const cards = document.querySelectorAll('.card');
const timeCounterElement = document.getElementById('time--counter');
const flipsCounterElement = document.getElementById('flips--counter');
const gameOverOverlay = document.getElementById('game-over-text');
const victoryOverlay = document.getElementById('victory-text');
const overlays = document.querySelectorAll('.overlay__text');
let intervalId;
let flipedCard;
let timeCounter;
let flipsCounter;

function startGame() {
    cards.forEach(card => {
        card.classList.remove('flip');
    });

    flipedCard = null;
    timeCounter = 50;
    timeCounterElement.innerText = ' ' + timeCounter;
    flipsCounter = 0;
    flipsCounterElement.innerText = ' ' + flipsCounter;

    shuffleCards();

    intervalId = setInterval(decreaseTimeCounter, 1000);
}

function initGame() {
    cards.forEach(card => card.addEventListener('click', flipCard));

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');

            startGame();
        });
    });
}

function shuffleCards() {
    cards.forEach(function (currentCard, currentIndex) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        cards[randomIndex].style.order = currentIndex;
        currentCard.style.order = randomIndex;
    });
}

function decreaseTimeCounter() {
    timeCounter--;
    timeCounterElement.innerText = ' ' + timeCounter;

    if (timeCounter == 0) {
        gameOverOverlay.classList.add('visible');
        clearInterval(intervalId);
    }
}

function flipCard() {
    const clickedCard = this;

    if (!clickedCard.classList.contains('flip')) {

        clickedCard.classList.add('flip');

        if (flipedCard != null) {
            const clickedCardImgSrc = clickedCard.querySelectorAll('.card__img')[0].src;
            const flipedCardImgSrc = flipedCard.querySelectorAll('.card__img')[0].src;

            if (clickedCardImgSrc === flipedCardImgSrc) {
                flipedCard = null;

                allFlipedCards = document.querySelectorAll('.flip');

                if (allFlipedCards.length == cards.length) {
                    victoryOverlay.classList.add('visible');
                    clearInterval(intervalId);
                }
               
            } else {
                setTimeout(function () {
                    flipedCard.classList.remove('flip');
                    clickedCard.classList.remove('flip');
                    flipedCard = null;
                }, 1000);
            }
        } else {
            flipedCard = clickedCard;
        }

        increaseFlipsCounter();
    }
}

function increaseFlipsCounter() {
    flipsCounter++;
    flipsCounterElement.innerHTML = ' ' + flipsCounter;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame());
} else {
    initGame();
}