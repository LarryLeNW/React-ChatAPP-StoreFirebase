import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoaJK7Ww5_bjJRrLG-4HcrSOKkurFhnVM",
  authDomain: "appchat-a54bf.firebaseapp.com",
  databaseURL:
    "https://appchat-a54bf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "appchat-a54bf",
  storageBucket: "appchat-a54bf.appspot.com",
  messagingSenderId: "385451519296",
  appId: "1:385451519296:web:89baaaa881929549549ea5",
  measurementId: "G-ZMG509KF7D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
