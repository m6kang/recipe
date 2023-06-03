// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwYRvFjxvStAggvUoNf2X7vYXO3YMibxs",
  authDomain: "recipe-17fe2.firebaseapp.com",
  projectId: "recipe-17fe2",
  storageBucket: "recipe-17fe2.appspot.com",
  messagingSenderId: "677836380861",
  appId: "1:677836380861:web:d8c3557204396aab1035d4",
  measurementId: "G-Q38V32G1V2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
