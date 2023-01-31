import { initializeApp, FirebaseOptions } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  Auth,
  User,
  signOut,
  connectAuthEmulator,
} from "firebase/auth";
import { firebaseApp } from "@/core/data/auth/firebaseAuth";
import { IAuthRepo, SignInParams, SignUpParams } from "./firebaseAuthRepo";
import { useAuthState } from "@/utils/useAuthState";
import { authenticationMachine } from "@/core/presentation/auth/authMachine";
import { ServiceMap } from "xstate";
import { connectFirestoreEmulator, getFirestore } from "@firebase/firestore";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from "@firebase/functions";

const firebase = firebaseApp();
const auth = getAuth(firebase);
const db = getFirestore();
const functions = getFunctions(firebase);
// use to debug on local with firebase emulators
connectAuthEmulator(auth, "http://localhost:9099");
connectFunctionsEmulator(functions, "localhost", 5001);
connectFirestoreEmulator(db, "localhost", 8080);

const services = {
  checkIfLoggedIn,
};

// TODO: refactor this code to factory pattern ??
async function init(firebaseConfig: FirebaseOptions): Promise<void> {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  authenticationMachine.withConfig({
    //services here
    services,
  });
}

export async function testFirebaseFunctions(): Promise<any> {
  const callable = httpsCallable(functions, "createUser");
  const data = {
    email: "test@firebase.com",
    password: "P@ssw0rd",
    role: "user",
  };
  try {
    const response = await callable(data);
    console.log("firebase functions res: ", response);
  } catch (e) {
    console.log("firebase functions error: ", e);
  }
}

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
    console.error("[frebase] login error: ", error);
    throw error;
  }
}

async function logOut(): Promise<void> {
  try {
    await signOut(auth);
    console.log("[firebase] logout success");
  } catch (error) {
    console.error("[frebase] logout error: ", error);
  }
}

export const firebaseAuthImpl: IAuthRepo = {
  signUp,
  logIn,
  checkIfLoggedIn,
  logOut,
};
