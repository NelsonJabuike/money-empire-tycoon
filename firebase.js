

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getAuth
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
getFirestore
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAJS-efkpoLRcRfLDtINNIUOetj5bPSu80",
  authDomain: "money-empire-tycoon.firebaseapp.com",
  projectId: "money-empire-tycoon",
  storageBucket: "money-empire-tycoon.firebasestorage.app",
  messagingSenderId: "1064218549796",
  appId: "1:1064218549796:web:ad321be44c0bde74f0c2b1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

