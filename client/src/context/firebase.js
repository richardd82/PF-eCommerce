import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwKuosJCtBHudenrTG1c2sqQN7IF8mRFE",
  authDomain: "alien-8f953.firebaseapp.com",
  projectId: "alien-8f953",
  storageBucket: "alien-8f953.appspot.com",
  messagingSenderId: "92777818540",
  appId: "1:92777818540:web:4f6bc8c34919a808d5f209",
  measurementId: "G-Y1DECS6BXX"
  // apiKey: "AIzaSyBZa300JkZwPhH3ZTsUPRyPt62MJLThXi8",
  // authDomain: "e-commerce-44c1a.firebaseapp.com",
  // projectId: "e-commerce-44c1a",
  // storageBucket: "e-commerce-44c1a.appspot.com",
  // messagingSenderId: "769513353737",
  // appId: "1:769513353737:web:5a5fce23fc490135a7bed8",
  // measurementId: "G-0HV2R5042L"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

