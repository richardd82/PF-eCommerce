import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"; 



const firebaseConfig = {
  apiKey: "AIzaSyAthC57xgrnfKan_0A22npdngwMwsjJJlw",
  authDomain: "alienstreet-816f2.firebaseapp.com",
  projectId: "alienstreet-816f2",
  storageBucket: "alienstreet-816f2.appspot.com",
  messagingSenderId: "424492007210",
  appId: "1:424492007210:web:812c7c008325248775a853",
  measurementId: "G-6ZSMH599SL"
  };

  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //EXPORT

  export const auth = getAuth(app)

  