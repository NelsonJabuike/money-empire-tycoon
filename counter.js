// ==========================
// MONEY EMPIRE TYCOON
// Smooth Money Counter
// ==========================

let displayedMoney = null;

function updateMoneyDisplay(targetMoney){

const moneyDisplay =
document.getElementById("money");

if(!moneyDisplay) return;

if(displayedMoney === null){

displayedMoney = targetMoney;

}

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
