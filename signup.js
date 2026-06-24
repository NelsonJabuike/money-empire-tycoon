import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
doc,
setDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document
.getElementById("signupBtn")
.addEventListener("click", async () => {

alert("Button Clicked");

const username =
document.getElementById("username").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const uid =
userCredential.user.uid;

await setDoc(
doc(db,"users",uid),
{
username,
email,
money:0,
workers:0,
factories:0,
banks:0,
level:1,
achievement:"Getting Started",
totalWithdrawn:0
}
);

alert("Account Created!");

window.location.href =
"login.html";

}catch(error){

alert(error.message);

}

});
