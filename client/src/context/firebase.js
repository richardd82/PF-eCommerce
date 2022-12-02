// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwKuosJCtBHudenrTG1c2sqQN7IF8mRFE",
  authDomain: "alien-8f953.firebaseapp.com",
  projectId: "alien-8f953",
  storageBucket: "alien-8f953.appspot.com",
  messagingSenderId: "92777818540",
  appId: "1:92777818540:web:4f6bc8c34919a808d5f209",
  measurementId: "G-Y1DECS6BXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(auth);