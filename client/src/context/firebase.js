import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAthC57xgrnfKan_0A22npdngwMwsjJJlw",
  authDomain: "alienstreet-816f2.firebaseapp.com",
  projectId: "alienstreet-816f2",
  storageBucket: "alienstreet-816f2.appspot.com",
  messagingSenderId: "424492007210",
  appId: "1:424492007210:web:812c7c008325248775a853",
  measurementId: "G-6ZSMH599SL"
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

