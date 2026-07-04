// ==========================
// MONEY EMPIRE TYCOON
// Sound System
// ==========================

const sounds = {

click: new Audio("sounds/click.mp3"),

buy: new Audio("sounds/buy.mp3"),

reward: new Audio("sounds/reward.mp3"),

achievement: new Audio("sounds/achievement.mp3"),

levelup: new Audio("sounds/levelup.mp3"),

unlock: new Audio("sounds/unlock.mp3"),

notification: new Audio("sounds/notification.mp3"),

error: new Audio("sounds/error.mp3"),

background: new Audio("sounds/background.mp3")

};

function playSound(name){

const sound = sounds[name];

if(!sound) return;

sound.pause();

sound.currentTime = 0;

sound.volume = 0.5;

sound.play().catch(()=>{});

}

window.playSound = playSound;

function playBackgroundMusic(){

const music = sounds.background;

if(!music) return;

music.loop = true;

music.volume = 0.25;

music.play().catch(()=>{});

}

window.playBackgroundMusic = playBackgroundMusic;
