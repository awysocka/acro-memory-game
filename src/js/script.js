
const cards = document.querySelectorAll('.card');

function flipCard() {
    this.classList.toggle('flip');
}

cards.forEach(card => {
    console.log(card);
    card.addEventListener("click", flipCard);
});

