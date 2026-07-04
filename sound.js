// ==========================
// MONEY EMPIRE TYCOON
// Sound System
// ==========================

const sounds = {

click: new Audio("sounds/click.mp3"),

buy: new Audio("sounds/buy.mp3"),

reward: new Audio("sounds/reward.mp3"),

achievement: new Audio("sounds/achievement.mp3")

};

function playSound(name){

if(!sounds[name]) return;

sounds[name].currentTime = 0;

sounds[name].play().catch(()=>{});

}

window.playSound = playSound;
