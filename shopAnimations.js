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

// Remove the animation class after it finishes
setTimeout(() => {

card.classList.remove("shopBounce");

}, 500);

}
