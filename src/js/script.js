
const cards = document.querySelectorAll('.card');
let flipedCard = null;

function flipCard() {
    const clickedCard = this;
    clickedCard.classList.add('flip');

    if (flipedCard != null) {

        const clickedCardImgSrc = clickedCard.querySelectorAll('.card__img')[0].src;
        const flipedCardImgSrc = flipedCard.querySelectorAll('.card__img')[0].src;

        if(clickedCardImgSrc === flipedCardImgSrc) {
            flipedCard = null;
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
}

cards.forEach(card => card.addEventListener("click", flipCard));
