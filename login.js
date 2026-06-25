     
     import { auth }
from "./firebase.js";

import {
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document
.getElementById("loginBtn")
.addEventListener("click", async () => {

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

const userCredential =
await signInWithEmailAndPassword(
auth,
email,
password
);

alert(
"UID:\n" +
userCredential.user.uid
);

localStorage.setItem(
"currentUser",
userCredential.user.uid
);

alert(
"Saved:\n" +
localStorage.getItem(
"currentUser"
)
);

window.location.href =
"index.html";

}
catch(error){

alert(
error.code +
"\n\n" +
error.message
);

}
