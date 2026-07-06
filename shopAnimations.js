// ==========================
// MONEY EMPIRE TYCOON
// Shop Animations
// ==========================

function animateShopCard(cardId){

const card = document.getElementById(cardId);

if(!card) return;

card.classList.remove("shopBounce");

void card.offsetWidth;

card.classList.add("shopBounce");

}

window.animateShopCard = animateShopCard;
