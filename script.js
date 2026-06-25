import { db }
from "./firebase.js";

import {
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

alert("script.js loaded");

const uid =
localStorage.getItem("currentUser");

alert(
"UID from localStorage:\n" +
uid
);

let money = 0; //testing only

let workers = 0;
let factories = 0;
let banks = 0;

let workerCost = 100;
let factoryCost = 20000;
let bankCost = 100000;
let level = 1;

let achievement =
"Getting Started";

let withdrawUnlocked = false;
let totalWithdrawn = 0;
let withdrawalHistory = [];


const moneyDisplay = document.getElementById("money");

document.getElementById("clickBtn")
.addEventListener("click", () => {

    
    money++;

showFloatingMoney();

checkLevel();

checkAchievements();

update();

});


    function buyWorker(){

    if(money >= workerCost){

        money -= workerCost;

        workers++;

        workerCost =
        Math.floor(workerCost * 1.15);

        showPurchase("👷 Worker Hired!");

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
        
        update();
    }
    
     
}

function buyBank(){

    if(money >= bankCost){

        money -= bankCost;

        banks++;

        bankCost = Math.floor(bankCost * 1.25);
         
         showPurchase("🏦 Bank Purchased!");

        update();
    }
    
}
    

function incomePerSecond(){

    return (
        workers * 0.25 +
        factories * 10 +
        banks * 100
    );
}

setInterval(() => {

    money += incomePerSecond();

    update();

},1000);

function update(){

    moneyDisplay.textContent =
      Math.floor(money).toLocaleString();

    document.getElementById("workers")
      .textContent = workers;

    document.getElementById("factories")
      .textContent = factories;

    document.getElementById("banks")
      .textContent = banks;

    document.getElementById("income")
      .textContent = incomePerSecond();

    document.getElementById("workerCost")
      .textContent = workerCost;

    document.getElementById("factoryCost")
      .textContent = factoryCost;

    document.getElementById("bankCost")
      .textContent = bankCost;

    saveGame();
    document.getElementById("level")
      .textContent = level;

   document.getElementById("achievement")
      .textContent = achievement;
      
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

if(buttons[2] && money >= bankCost)
    buttons[2].classList.add("can-buy");

   updateProgress();
   updateReward();
   checkWithdraw();
}  
  
  loadGame();
  checkLevel();
  checkAchievements();
  update();
         
 function saveGame(){

   localStorage.setItem("moneyGame",
    JSON.stringify({

        money,
        workers,
        factories,
        banks,
        workerCost,
        factoryCost,
        bankCost,
        level,
        achievement,
        withdrawUnlocked,
        totalWithdrawn,
        withdrawalHistory
    })); 
}

    function loadGame(){
    //localStorage.clear()
    
    let save =
    JSON.parse(localStorage.getItem("moneyGame"));

    if(save){
        
        money = save.money;
        workers = save.workers;
        factories = save.factories;
        banks = save.banks;

        workerCost = save.workerCost;
        factoryCost = save.factoryCost;
        bankCost = save.bankCost;

        level = save.level || 1;

        achievement =
        save.achievement ||
        "Getting Started";

        totalWithdrawn =
        save.totalWithdrawn || 0;
        
        withdrawalHistory =
        save.withdrawalHistory || [];
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
}


function checkAchievements(){

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

}
     function showPurchase(text){

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
   let progress =
((money-currentTarget) /
(nextTarget-currentTarget)) * 100;
    

      progress =
      Math.max(0,
      Math.min(progress,100));

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

    if(
        money >= 100000 &&
        !withdrawUnlocked
    ){

        withdrawUnlocked = true;

        document
        .getElementById("withdrawModal")
        .style.display = "flex";

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

