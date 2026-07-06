
    
import { db }
from "./firebase.js";

import {
doc,
getDoc,
updateDoc,
collection,
getDocs,
query,
orderBy,
limit
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const uid =
localStorage.getItem("currentUser");

if(!uid){

alert("No User Logged In");

window.location.href =
"login.html";

}


let money = 0; //testing only
let workers = 0;
let factories = 0;
let logistics = 0;
let banks = 0;

let workerCost = 100;
let factoryCost = 20000;
let logisticsCost = 50000;
let bankCost = 125000;
let level = 1;
let achievement =
"Getting Started";

let previousAchievement =
"Getting Started";

let withdrawUnlocked = false;
let totalWithdrawn = 0;
let withdrawalHistory = [];
let lastDailyReward = 0;
let claimedAchievements = [];
let dailyRewardUnlocked = false;
let needsCloudSave = true;

const DAILY_REWARD = 1000;

const ACHIEVEMENT_REWARDS = {

"🌱 Beginner":100,

"🥉 Bronze Earner":500,

"🥈 Silver Earner":1000,

"🥇 Gold Earner":5000,

"💎 Platinum Investor":10000,

"👑 Business Owner":25000,

"🏦 Financial Expert":50000,

"💰 Millionaire":100000,

"🚀 Tycoon":500000,

"🌎 Business Mogul":1000000,

"👑 Empire Builder":5000000

};

const rewardBtn =
document.getElementById("dailyRewardBtn");

const rewardTimer =
document.getElementById("dailyRewardTimer");

const achievementBtn =
document.getElementById("claimAchievementBtn");

const userRef =
doc(db, "users", uid);
const userSnap =
await getDoc(userRef);

if(userSnap.exists()){

    const data =
    userSnap.data();

    money =
    data.money || 0;

    workers =
    data.workers || 0;

    factories =
    data.factories || 0;

    logistics =
    data.logistics || 0;

    banks =
    data.banks || 0;
    
    workerCost =
    data.workerCost || 100;

    factoryCost =
    data.factoryCost || 20000;

    logisticsCost =
    data.logisticsCost || 50000;

    bankCost =
    data.bankCost || 125000;
    
    withdrawUnlocked =
    data.withdrawUnlocked || false;

    totalWithdrawn =
    data.totalWithdrawn || 0;

    withdrawalHistory =
    data.withdrawalHistory || [];

    dailyRewardUnlocked =
    data.dailyRewardUnlocked || false;

    level =
    data.level || 1;

    achievement =
    data.achievement ||
    "Getting Started";
    
    lastDailyReward =
    data.lastDailyReward || 0;
    
    claimedAchievements =
    data.claimedAchievements || [];
    
    document.getElementById("welcomeUser")
    .textContent =
    "👋 Welcome, " +
    (data.username || "Player");

    document.getElementById("loadingScreen")
.style.display = "none";

}

const logoutBtn =
document.getElementById("logoutBtn");

const moneyDisplay = document.getElementById("money");

document.getElementById("clickBtn")
.addEventListener("click", () => {

playSound("click");
    
animateClickButton();
      
    money++;

showFloatingMoney();

checkLevel();

checkAchievements();

update();


});

document.getElementById("clickBtn")
.addEventListener("click", () => {

playBackgroundMusic();

}, { once: true });


    function buyWorker(){

    if(money >= workerCost){

        money -= workerCost;

        workers++;

        workerCost =
        Math.floor(workerCost * 1.15);

        showPurchase("👷 Worker Hired!");
        animateShopCard("workerCard");
        update();
        
    }
}


function buyFactory(){

    if(money >= factoryCost){

        money -= factoryCost;

        factories++;

        factoryCost = 
        Math.floor(factoryCost * 1.20);
        
        showPurchase("🏭 Factory Built!"); 
        animateShopCard("factoryCard");
        update();

    }
    
     
}

function buyLogistics(){

    if(money >= logisticsCost){

        money -= logisticsCost;

        logistics++;

        logisticsCost =
        Math.floor(logisticsCost * 1.22);

        showPurchase("🚚 Logistics Company Purchased!");

        animateShopCard("logisticsCard");

        update();

    }

}

function buyBank(){

    if(money >= bankCost){

        money -= bankCost;

        banks++;

        bankCost = Math.floor(bankCost * 1.25);
         
        showPurchase("🏦 Bank Purchased!");
        animateShopCard("bankCard");
        update();
        
    }
    
}
    

function incomePerSecond(){

    return (
    workers * 0.25 +
    factories * 10 +
    logistics * 40 +
    banks * 100
);
}

setInterval(() => {

    money += incomePerSecond();

    update();

},1000);

setInterval(() => {
    saveToFirestore();
}, 5000);

function update(){

    updateMoneyDisplay(money);
    
    document.getElementById("workers")
      .textContent = workers;

    document.getElementById("factories")
      .textContent = factories;

    document.getElementById("logistics")
      .textContent = logistics;

    document.getElementById("banks")
      .textContent = banks;

    document.getElementById("income")
      .textContent = incomePerSecond();

    document.getElementById("workerCost")
      .textContent = workerCost;

    document.getElementById("factoryCost")
      .textContent = factoryCost;

    document.getElementById("logisticsCost")
      .textContent = logisticsCost;

    document.getElementById("bankCost")
      .textContent = bankCost;

    document.getElementById("level")
      .textContent = level;

   document.getElementById("achievement")
      .textContent = achievement;
      
   const buttons =
document.querySelectorAll(".item button");

buttons.forEach(btn =>
btn.classList.remove("can-buy"));

if(buttons[0] && money >= workerCost)
    buttons[0].classList.add("can-buy");

if(buttons[1] && money >= factoryCost)
    buttons[1].classList.add("can-buy");

if(buttons[2] && money >= logisticsCost)
    buttons[2].classList.add("can-buy");

if(buttons[3] && money >= bankCost)
    buttons[3].classList.add("can-buy");

   updateProgress();
   updateReward();
   checkWithdraw();
   highlightCurrentAchievement();
   
   if(level >= 4 && !dailyRewardUnlocked){

dailyRewardUnlocked = true;

showAchievementPopup("🎁 Daily Rewards Unlocked!");

playUnlock();
        
}
   
   if(level < 4){

rewardBtn.disabled = true;

rewardBtn.textContent =
"🔒 Unlocks at Level 4";

document.getElementById("dailyRewardInfo")
.textContent =
`Reach Level 4 to unlock Daily Rewards. (Level ${level}/4)`;

}
else if(
Date.now() - lastDailyReward <
86400000
){

rewardBtn.disabled = true;

rewardBtn.textContent =
"✅ Claimed";

document.getElementById("dailyRewardInfo")
.textContent =
"Come back every 24 hours to claim free cash.";
}
else{

rewardBtn.disabled = false;

rewardBtn.textContent =
"🎁 Claim Daily Reward";

}

const achievementReward =
ACHIEVEMENT_REWARDS[achievement] || 0;

if(
claimedAchievements.includes(achievement)
){

achievementBtn.disabled = true;

achievementBtn.textContent =
"✅ Achievement Claimed";

}
else{

achievementBtn.disabled = false;

achievementBtn.textContent =
`🎁 Claim $${achievementReward.toLocaleString()} Reward`;

}
   markCloudSave();
   saveGame();
   
}  
  
checkLevel();
checkAchievements();
update();

updateDailyRewardTimer();

loadLeaderboard();

setInterval(loadLeaderboard,10000);

setInterval(updateDailyRewardTimer,1000);


function markCloudSave(){

    needsCloudSave = true;

}

 function saveGame(){

   localStorage.setItem("moneyGame",
    JSON.stringify({

        money,
        workers,
        factories,
        logistics,
        banks,

        workerCost,
        factoryCost,
        logisticsCost,
        bankCost,
        
        level,
        achievement,
        withdrawUnlocked,
        totalWithdrawn,
        withdrawalHistory,
        lastDailyReward,
        claimedAchievements,
        dailyRewardUnlocked
    })); 
}
    
 async function saveToFirestore(){

if(!needsCloudSave) return;

needsCloudSave = false;

await updateDoc(
doc(db,"users",uid),
{
        money,
        workers,
        factories,
        logistics,
        banks,

        workerCost,
        factoryCost,
        logisticsCost,
        bankCost,
    
        level,
        achievement,
        withdrawUnlocked,
        totalWithdrawn,
        withdrawalHistory,
        lastDailyReward,
        claimedAchievements,
        dailyRewardUnlocked
}
);

}

    function loadGame(){
    //localStorage.clear()
    
    let save =
    JSON.parse(localStorage.getItem("moneyGame"));

    if(save){
        
        money = save.money;
        workers = save.workers;
        factories = save.factories;
        logistics = save.logistics;
        banks = save.banks;

        workerCost = save.workerCost;
        factoryCost = save.factoryCost;
        logisticsCost = save.logisticsCost;
        bankCost = save.bankCost;

        level = save.level || 1;

        achievement =
        save.achievement ||
        "Getting Started";

        totalWithdrawn =
        save.totalWithdrawn || 0;
        
        withdrawalHistory =
        save.withdrawalHistory || [];
        
        lastDailyReward =
        save.lastDailyReward || 0;
        
        claimedAchievements =
        save.claimedAchievements || [];
        
        dailyRewardUnlocked =
        save.dailyRewardUnlocked || false;
    }


    
 }
    
    function showFloatingMoney(){

    const container =
    document.getElementById(
      "floating-container"
    );

    const text =
    document.createElement("div");

    text.className =
    "float-money";

    text.textContent =
    "+$1";

    container.appendChild(text);

    setTimeout(() => {

        text.remove();

    },1000);


}

function checkLevel(){
     
    const oldLevel = level;
     
    if(money >= 10){

        level = 1;
    }

    if(money >= 100){

        level = 2;

    }

    if(money >= 1000){

        level = 3;

    }

    if(money >= 10000){

        level = 4;

    }

    if(money >= 50000){

        level = 5;

    }
    
    if(money >= 100000){

        level = 6;
        
    }
    
    if(money >= 500000){

        level = 7;
    }
    
    if(money >= 1000000){

        level = 8;
}

    if(money >= 10000000){

        level = 9;
    }
    
    if(money >= 100000000){

        level = 10;
    }
    
    if(money >= 1000000000){

        level = 11;
    }
     if(level > oldLevel){

     playLevelUp();

     }
}


function checkAchievements(){
    
    previousAchievement = achievement;
    
    if(money >= 10){
        achievement = "🌱 Beginner";
    }

    if(money >= 100){
        achievement = "🥉 Bronze Earner";
    }

    if(money >= 1000){
        achievement = "🥈 Silver Earner";
    }

    if(money >= 10000){
        achievement = "🥇 Gold Earner";
    }

    if(money >= 50000){
        achievement = "💎 Platinum Investor";
    }

    if(money >= 100000){
        achievement = "👑 Business Owner";
    }

    if(money >= 500000){
        achievement = "🏦 Financial Expert";
    }

    if(money >= 1000000){
        achievement = "💰 Millionaire";
    }

    if(money >= 10000000){
        achievement = "🚀 Tycoon";
    }

    if(money >= 100000000){
        achievement = "🌎 Business Mogul";
    }

    if(money >= 1000000000){
        achievement = "👑 Empire Builder";
    }
    
    if(previousAchievement !== achievement){

       showAchievementPopup(achievement);

}

}
     function showPurchase(text){
           
     playSound("buy");
           
    const msg =
    document.createElement("div");

    msg.innerText = text;

    msg.style.position = "fixed";
    msg.style.left = "50%";
    msg.style.top = "50%";
    msg.style.transform =
    "translate(-50%,-50%)";

    msg.style.fontSize = "30px";
    msg.style.fontWeight = "bold";

    msg.style.color = "gold";

    document.body.appendChild(msg);

    setTimeout(() => {

        msg.remove();

    },1000);
    
    

}

    function updateProgress(){

    let currentRank = "Beginner";
    let nextRank = "Bronze Earner";

    let currentTarget = 0;
    let nextTarget = 100;

    if(money >= 100){

        currentRank = "Bronze Earner";
        nextRank = "Silver Earner";

        currentTarget = 100;
        nextTarget = 1000;
    }

    if(money >= 1000){

        currentRank = "Silver Earner";
        nextRank = "Gold Earner";

        currentTarget = 1000;
        nextTarget = 10000;
    }

    if(money >= 10000){

        currentRank = "Gold Earner";
        nextRank = "Platinum Investor";

        currentTarget = 10000;
        nextTarget = 50000;
    }

    if(money >= 50000){

        currentRank = "Platinum Investor";
        nextRank = "Business Owner";

        currentTarget = 50000;
        nextTarget = 100000;
    }

    
            if(money >= 100000){

    currentRank = "Business Owner";
    nextRank = "Financial Expert";

    currentTarget = 100000;
    nextTarget = 500000;
}

if(money >= 500000){

    currentRank = "Financial Expert";
    nextRank = "Millionaire";

    currentTarget = 500000;
    nextTarget = 1000000;
}

 if(money >= 1000000){

    currentRank = "Millionaire";
    nextRank = "Tycoon";

    currentTarget = 1000000;
    nextTarget = 10000000;
 }
  if(money >= 10000000){

    currentRank = "Tycoon";
    nextRank = "Business Mogul";

    currentTarget = 10000000;
    nextTarget = 100000000;
}

if(money >= 100000000){

    currentRank = "Business Mogul";
    nextRank = "Empire Builder";

    currentTarget = 100000000;
    nextTarget = 1000000000;
}

if(money >= 1000000000){

    currentRank = "Empire Builder";
    nextRank = "MAX RANK";

    currentTarget = 1000000000;
    nextTarget = 1000000000;
}      
        
   let progress;

if(nextTarget === currentTarget){

    progress = 100;

}
else{

    progress =
    ((money - currentTarget) /
    (nextTarget - currentTarget)) * 100;

    progress =
    Math.max(0, Math.min(progress,100));

}

    document.getElementById("currentRank")
    .textContent = currentRank;

    document.getElementById("nextRank")
    .textContent = nextRank;

    document.getElementById("progressFill")
    .style.width = progress + "%";

    document.getElementById("progressPercent")
    .textContent =
    Math.floor(progress) + "%";

    document.getElementById("progressNumbers")
    .textContent =
    `${Math.floor(money-currentTarget).toLocaleString()} / ${(nextTarget-currentTarget).toLocaleString()} XP`;
        

        
}

function checkWithdraw(){

    const withdrawCard =
    document.getElementById("withdrawCard");

    if(money >= 100000){

        withdrawCard.style.display = "block";

        if(!withdrawUnlocked){

            withdrawUnlocked = true;

            playSound("unlock");

            document
            .getElementById("withdrawModal")
            .style.display = "flex";
        }

        }else{

        withdrawCard.style.display = "none";

    }

}

  document
.getElementById("withdrawNow")
.addEventListener("click",()=>{

    window.location.href =
    "payout.html";

});

document
.getElementById("withdrawLater")
.addEventListener("click",()=>{

    document
    .getElementById("withdrawModal")
    .style.display = "none";

document
.getElementById(
"withdrawCard"
)
.style.display = "block";

});

   function updateReward(){

    let reward =
    (money / 100000).toFixed(2);

    document
    .getElementById("rewardAmount")
    .textContent =
    "$" + reward;
}   

    
document.getElementById("withdrawCardBtn")
.addEventListener("click",()=>{

    window.location.href =
    "payout.html";

});

    document
.getElementById("logoutBtn")
.addEventListener("click", () => {

localStorage.removeItem(
"currentUser"
);

window.location.href =
"login.html";

});

   window.buyWorker = buyWorker;
   window.buyFactory = buyFactory;
   window.buyLogistics = buyLogistics;
   window.buyBank = buyBank;
   
   function logout(){

localStorage.removeItem(
"currentUser"
);

window.location.href =
"login.html";

}

window.logout = logout;


async function loadLeaderboard(){

const leaderboard =
document.getElementById("leaderboard");

leaderboard.innerHTML =
"<li>Loading...</li>";

const q = query(

collection(db,"users"),

orderBy("money","desc"),

limit(10)

);

const snapshot =
await getDocs(q);

leaderboard.innerHTML = "";

let rank = 1;

snapshot.forEach(player=>{

const data = player.data();

const isYou =
player.id === uid;

const you =
isYou ?
" <span class='youBadge'>YOU</span>" :
"";

leaderboard.innerHTML += `

<li class="${isYou ? 'myRank' : ''}">

<span>

${
rank==1 ? "🥇" :
rank==2 ? "🥈" :
rank==3 ? "🥉" :
"🏅"
}
${data.username || "Player"}${you}
<br>

<small>

${data.achievement || "Getting Started"}

</small>

</span>

<span class="money">

$${Math.floor(data.money || 0).toLocaleString()}

</span>

</li>

`;

rank++;

});

}

  
  rewardBtn.addEventListener(
"click",
claimDailyReward
);

achievementBtn.addEventListener(
"click",
claimAchievementReward
);

async function claimDailyReward(){

const now = Date.now();

if(
now - lastDailyReward <
86400000
){

showNotification(
"⏰ Daily reward already claimed.",
"warning"
);

return;

}

money += DAILY_REWARD;
      
playSound("reward");
      
lastDailyReward = now;

update();

await saveToFirestore();

showNotification(
"🎉 Daily Reward +$" +
DAILY_REWARD
);

}

async function claimAchievementReward(){

if(claimedAchievements.includes(achievement)){

showNotification(
"🏆 Achievement reward already claimed.",
"warning"
);

return;

}

const reward =
ACHIEVEMENT_REWARDS[achievement];

if(!reward){

showNotification(
"⚠ No reward available yet.",
"warning"
);

return;

}

money += reward;
      
playSound("reward");
      
claimedAchievements.push(achievement);

update();

await saveToFirestore();

showNotification(
"🏆 Achievement Reward +$" +
reward.toLocaleString()
);

}

function showAchievementPopup(text){

playSound("achievement");
      
const popup =
document.getElementById("achievementPopup");

const popupText =
document.getElementById("achievementPopupText");

popupText.textContent = text;

popup.classList.add("show");

setTimeout(()=>{

popup.classList.remove("show");

},3000);

}

function showNotification(message,type="success"){

const container =
document.getElementById("notificationContainer");

const notification =
document.createElement("div");

notification.className =
"notification";

if(type !== "success"){

notification.classList.add(type);

playError();

}

notification.textContent = message;

if(type === "success"){

playNotification();

}
     
container.appendChild(notification);

setTimeout(()=>{

notification.remove();

},3000);

}

function highlightCurrentAchievement(){

const ids = [

"achBeginner",

"achBronze",

"achSilver",

"achGold",

"achPlatinum",

"achBusiness",

"achExpert",

"achMillionaire",

"achTycoon",

"achMogul",

"achEmpire"

];

ids.forEach(id=>{

document
.getElementById(id)
.classList.remove("currentAchievement");

});

const map = {

"🌱 Beginner":"achBeginner",

"🥉 Bronze Earner":"achBronze",

"🥈 Silver Earner":"achSilver",

"🥇 Gold Earner":"achGold",

"💎 Platinum Investor":"achPlatinum",

"👑 Business Owner":"achBusiness",

"🏦 Financial Expert":"achExpert",

"💰 Millionaire":"achMillionaire",

"🚀 Tycoon":"achTycoon",

"🌎 Business Mogul":"achMogul",

"👑 Empire Builder":"achEmpire"

};

const currentId = map[achievement];

if(currentId){

document
.getElementById(currentId)
.classList.add("currentAchievement");

}

}

function updateDailyRewardTimer(){

const remaining =
86400000 - (Date.now() - lastDailyReward);

if(remaining <= 0){

rewardTimer.textContent =
"🎉 Reward Ready!";

rewardBtn.disabled = false;

rewardBtn.textContent =
"🎁 Claim Daily Reward";

rewardBtn.classList.add("rewardReady");

return;

}
const hours =
Math.floor(remaining / 3600000);

const minutes =
Math.floor((remaining % 3600000) / 60000);

const seconds =
Math.floor((remaining % 60000) / 1000);

rewardTimer.textContent =
`⏳ Next reward in ${hours}h ${minutes}m ${seconds}s`;

rewardBtn.disabled = true;

rewardBtn.textContent =
"🔒 Daily Reward Claimed";
rewardBtn.classList.remove("rewardReady");
}
