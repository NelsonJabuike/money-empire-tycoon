
function showAchievementPopup(text){
‎
‎const popup =
‎document.getElementById("achievementPopup");
‎
‎const popupText =
‎document.getElementById("achievementPopupText");
‎
‎popupText.textContent = text;
‎
‎popup.classList.add("show");
‎
‎setTimeout(()=>{
‎
‎popup.classList.remove("show");
‎
‎},3000);
‎
‎}
‎
‎
‎function showNotification(message,type="success"){
‎
‎const container =
‎document.getElementById("notificationContainer");
‎
‎const notification =
‎document.createElement("div");
‎
‎notification.className =
‎"notification";
‎
‎if(type !== "success"){
‎
‎notification.classList.add(type);
‎
‎}
‎
‎notification.textContent = message;
‎
‎container.appendChild(notification);
‎
‎setTimeout(()=>{
‎
‎notification.remove();
‎
‎},3000);
‎
‎}
‎
‎
‎function highlightCurrentAchievement(){
‎
‎const ids = [
‎
‎"achBeginner",
‎
‎"achBronze",
‎
‎"achSilver",
‎
‎"achGold",
‎
‎"achPlatinum",
‎
‎"achBusiness",
‎
‎"achExpert",
‎
‎"achMillionaire",
‎
‎"achTycoon",
‎
‎"achMogul",
‎
‎"achEmpire"
‎
‎];
‎
‎ids.forEach(id=>{
‎
‎document
‎.getElementById(id)
‎.classList.remove("currentAchievement");
‎
‎});
‎
‎const map = {
‎
‎"🌱 Beginner":"achBeginner",
‎
‎"🥉 Bronze Earner":"achBronze",
‎
‎"🥈 Silver Earner":"achSilver",
‎
‎"🥇 Gold Earner":"achGold",
‎
‎"💎 Platinum Investor":"achPlatinum",
‎
‎"👑 Business Owner":"achBusiness",
‎
‎"🏦 Financial Expert":"achExpert",
‎
‎"💰 Millionaire":"achMillionaire",
‎
‎"🚀 Tycoon":"achTycoon",
‎
‎"🌎 Business Mogul":"achMogul",
‎
‎"👑 Empire Builder":"achEmpire"
‎
‎};



window.showNotification = showNotification;
window.showAchievementPopup = showAchievementPopup;
window.highlightCurrentAchievement = highlightCurrentAchievement;
