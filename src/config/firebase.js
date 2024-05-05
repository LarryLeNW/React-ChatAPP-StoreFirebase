import { initializeApp } from "firebase/app";
import dotenv from "dotenv";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

dotenv.config();
console.log(process.env.APIKEY_FIREBASE);
const firebaseConfig = {
  apiKey: process.env.APIKEY_FIREBASE,
  authDomain: "chatapp-a7c78.firebaseapp.com",
  projectId: "chatapp-a7c78",
  storageBucket: "chatapp-a7c78.appspot.com",
  messagingSenderId: "674902884786",
  appId: "1:674902884786:web:f7570bea26cd0f7c52e4ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
