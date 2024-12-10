import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  User,
  signOut,
} from "firebase/auth";
import { firebaseApp } from "@/core/data/auth/firebaseApp";
import { IAuthRepo, SignInParams, SignUpParams } from "./firebaseAuthRepo";
import { FirebaseError } from "firebase/app";
import { Role } from "@/core/types/authentication";

const { firebase, auth, db, functions } = firebaseApp;

async function checkIfLoggedIn(): Promise<User | Error> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userInfo) => {
      unsubscribe();
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
  } catch (error) {
    console.error("[firebase] logout error: ", error);
  }
}

async function getRole(): Promise<Role> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not found");
    }
    const idToken = await user.getIdTokenResult();
    const role = idToken.claims.role as Role ?? "";
    return role;
  } catch (error) {
    throw error;
  }
}

export const firebaseAuthImpl: IAuthRepo = {
  getRole,
  signUp,
  logIn,
  checkIfLoggedIn,
  logOut,
};
