// Import the functions you need from the SDKs you need
import { connectFirestoreEmulator, getFirestore } from '@firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from '@firebase/functions';
import { connectStorageEmulator, getStorage } from '@firebase/storage';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// FIREBASE Project: santi-signins
const firebaseConfig = {
  apiKey: 'AIzaSyA2Y70pjMP7cFn_0TD7qPqOEzqWMFqTCFo',
  authDomain: 'santi-signin.firebaseapp.com',
  databaseURL:
    'https://santi-signin-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'santi-signin',
  storageBucket: 'santi-signin.appspot.com',
  messagingSenderId: '565264047830',
  appId: '1:565264047830:web:8566140958142d08b47377',
  measurementId: 'G-TQJ6SMBV1G',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore();
const functions = getFunctions(firebase);
const storage = getStorage(firebase);

// use to debug on local with firebase emulators

if (import.meta.env.MODE === 'development') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
}

export const firebaseApp = {
  firebase,
  auth,
  db,
  functions,
  storage,
};
