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

let soundEnabled =
JSON.parse(localStorage.getItem("soundEnabled") ?? "true");

let musicEnabled =
JSON.parse(localStorage.getItem("musicEnabled") ?? "true");

let masterVolume =
Number(localStorage.getItem("masterVolume") ?? "0.5");

function playSound(name){

const sound = sounds[name];

if(!sound) return;

sound.pause();

sound.currentTime = 0;

if(!soundEnabled) return;

sound.volume = masterVolume;

sound.play().catch(()=>{});

}

window.playSound = playSound;

function playBackgroundMusic(){

const music = sounds.background;

if(!music) return;

if(!musicEnabled) return;

music.loop = true;

music.volume = masterVolume * 0.5;

music.play().catch(()=>{});

}

window.playBackgroundMusic = playBackgroundMusic;

function playLevelUp() {
    playSound("levelup");
}

function playUnlock() {
    playSound("unlock");
}

function playNotification() {
    playSound("notification");
}

function playError() {
    playSound("error");
}

window.playLevelUp = playLevelUp;
window.playUnlock = playUnlock;
window.playNotification = playNotification;
window.playError = playError;
