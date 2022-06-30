// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const firebaseApp = initializeApp(firebaseConfig);