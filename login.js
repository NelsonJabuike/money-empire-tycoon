     
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

localStorage.setItem(
"currentUser",
userCredential.user.uid
);

alert("Login Successful!");

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

});
