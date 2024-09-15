// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAef95mZhnXp998wh5mNXzOwiRi2rSij4Y",
  authDomain: "netflixgpt2-3f542.firebaseapp.com",
  projectId: "netflixgpt2-3f542",
  storageBucket: "netflixgpt2-3f542.appspot.com",
  messagingSenderId: "716893373934",
  appId: "1:716893373934:web:917be1ddfef395f6027aff",
  measurementId: "G-DGHHPJK8CK",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
