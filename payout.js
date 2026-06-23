   
const save =
JSON.parse(
localStorage.getItem("moneyGame")
);

let availableReward = 0;

  function renderHistory(){

    const historyDiv =
    document.getElementById(
    "historyList"
    );

    if(
      !save.withdrawalHistory ||
      save.withdrawalHistory.length === 0
    ){

        historyDiv.innerHTML =
        "No withdrawals yet";

        return;
    }

    historyDiv.innerHTML =
    save.withdrawalHistory
    .map(item =>

    `<p>
    💵 $${item.amount}
    <br>
    <small>${item.date}</small>
    </p>`

    ).join("");

}

if(save){

    document
    .getElementById("playerRank")
    .textContent =
    save.achievement;

    document
    .getElementById("lifetimeEarnings")
    .textContent =
    Math.floor(save.money)
    .toLocaleString();

    const income =
    save.workers * 0.25 +
    save.factories * 10 +
    save.banks * 100;

    document
    .getElementById("playerIncome")
    .textContent =
    income.toLocaleString();

    availableReward =
    (save.money / 100000) -
    (save.totalWithdrawn || 0);

    document
    .getElementById("rewardAmount")
    .textContent =
    availableReward.toFixed(2);
    
    renderHistory();
}


document
.getElementById("withdrawForm")
.addEventListener("submit",
function(e){

    e.preventDefault();

    const amount =
    parseFloat(
    document
    .getElementById("withdrawAmount")
    .value);

    const error =
    document
    .getElementById("withdrawError");

     const amountInput =
     document
     .getElementById("withdrawAmount");

      amountInput.classList.remove(
      "error-input"
);
    

    error.textContent = "";

    if(isNaN(amount)){

        error.textContent =
        "Enter withdrawal amount";

        return;
    }

    if(amount < 1){
        
        amountInput.classList.add(
        "error-input"
);

        error.textContent =
        "Minimum withdrawal is $1";

        return;
    }

    if(amount > 10){
        
         amountInput.classList.add(
        "error-input"
);
         
        error.textContent =
        "Maximum withdrawal is $10";

        return;
    }

    if(amount > availableReward){
         
         amountInput.classList.add(
         "error-input"
);

        error.textContent =
        "Amount exceeds available reward";

        return;
    }

    save.totalWithdrawn =
(save.totalWithdrawn || 0)
+ amount;
  if(!save.withdrawalHistory){

    save.withdrawalHistory = [];

}

save.withdrawalHistory.unshift({

    amount: amount.toFixed(2),

    date:
    new Date().toLocaleString()

});

    save.money -= amount * 100000;
    
    if(save.money < 0){
    save.money = 0;
}
    
localStorage.setItem(
"moneyGame",
JSON.stringify(save)
);
  renderHistory();

      availableReward -= amount;

       document
      .getElementById("rewardAmount")
     .textContent =
     availableReward.toFixed(2);
     
     document
     .getElementById("availableReward")
     .textContent =
      availableReward.toFixed(2);

alert(
      "Withdrawal Request Submitted: $" +
     amount.toFixed(2)
);
     document
     .getElementById("withdrawForm")
     .reset();

});