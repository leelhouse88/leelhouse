// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsgaeCzMmXRMylJmrJe1cXC6r7-U0TSKk",
  authDomain: "loanapp-f7b7f.firebaseapp.com",
  projectId: "loanapp-f7b7f",
  storageBucket: "loanapp-f7b7f.appspot.com",
  messagingSenderId: "788294818395",
  appId: "1:788294818395:web:5a435d359618c3612a3d7e",
  measurementId: "G-BNT1KRWBRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



