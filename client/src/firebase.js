import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"; 



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

  //EXPORT

  export const auth = getAuth(app)

  