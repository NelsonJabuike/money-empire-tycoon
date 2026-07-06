// ==========================
// MONEY EMPIRE TYCOON
// Smooth Money Counter
// ==========================

let displayedMoney = 0;

function updateMoneyDisplay(targetMoney){

const moneyDisplay =
document.getElementById("money");

if(!moneyDisplay) return;

displayedMoney += (targetMoney - displayedMoney) * 0.15;

if(Math.abs(targetMoney - displayedMoney) < 1){

displayedMoney = targetMoney;

}

moneyDisplay.textContent =
Math.floor(displayedMoney).toLocaleString();

requestAnimationFrame(() =>
updateMoneyDisplay(targetMoney));

}

window.updateMoneyDisplay = updateMoneyDisplay;
