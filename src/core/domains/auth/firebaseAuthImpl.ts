import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  User,
  signOut,
  connectAuthEmulator,
} from "firebase/auth";
import { firebaseApp } from "@/core/data/auth/firebaseAuth";
import { IAuthRepo, SignInParams, SignUpParams } from "./firebaseAuthRepo";
import { connectFirestoreEmulator, getFirestore } from "@firebase/firestore";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from "@firebase/functions";
import { FirebaseError } from "firebase/app";

const { firebase, auth, db, functions } = firebaseApp;

async function checkIfLoggedIn(): Promise<User | Error> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userInfo) => {
      unsubscribe();
      console.log("[firebase] checkIfLoggedIn result: ", userInfo);
      return userInfo ? resolve(userInfo) : reject("not logged in");
    });
  });
}

async function signUp(
  params: SignUpParams
): Promise<User | undefined> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      params.email,
      params.password
    );
    console.log("[firebase] signup success: ", userCredential);
    return userCredential.user;
  } catch (error) {
    console.error("[firebase] signup error: ", error);
  }
}

async function logIn(
  params: SignInParams
): Promise<User | undefined> {
  try {
    const { email, password, isRememberMe } = params;
    // set persistence type whether LocalStorage or Session
    // by default: firebase use LocalStorage to store
    await setPersistence(
      auth,
      isRememberMe ? browserLocalPersistence : browserSessionPersistence
    );
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("[firebase] login success: ", userCredential);
    return userCredential.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("[firebase] login error: ", error.code);
      throw new Error(error.code);
    } else {
      throw error;
    }
  }
}

async function logOut(): Promise<void> {
  try {
    await signOut(auth);
    console.log("[firebase] logout success");
  } catch (error) {
    console.error("[firebase] logout error: ", error);
  }
}

export const firebaseAuthImpl: IAuthRepo = {
  signUp,
  logIn,
  checkIfLoggedIn,
  logOut,
};
