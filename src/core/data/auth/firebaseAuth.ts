// Import the functions you need from the SDKs you need
import { connectFirestoreEmulator, getFirestore } from "@firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "@firebase/functions";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// FIREBASE Project: santi-signins
const firebaseConfig = {
  apiKey: "AIzaSyA2Y70pjMP7cFn_0TD7qPqOEzqWMFqTCFo",
  authDomain: "santi-signin.firebaseapp.com",
  projectId: "santi-signin",
  storageBucket: "santi-signin.appspot.com",
  messagingSenderId: "565264047830",
  appId: "1:565264047830:web:8566140958142d08b47377",
  measurementId: "G-TQJ6SMBV1G"
};

// Initialize Firebase
console.info('[FIREBASE] initialize firebase');
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase)
const db = getFirestore();
const functions = getFunctions();

// use to debug on local with firebase emulators
connectAuthEmulator(auth, "http://localhost:9099");
connectFunctionsEmulator(functions, "localhost", 5001);
connectFirestoreEmulator(db, "localhost", 8080);

export const firebaseApp = {
  firebase,
  auth,
  db,
  functions,
}
