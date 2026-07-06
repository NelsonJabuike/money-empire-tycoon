// ==========================
// MONEY EMPIRE TYCOON
// Animation System
// ==========================

// Button Click Animation
function animateClickButton(){

const button =
document.getElementById("clickBtn");

if(!button) return;

button.classList.remove("clickBounce");

void button.offsetWidth;

button.classList.add("clickBounce");

}

window.animateClickButton = animateClickButton;
