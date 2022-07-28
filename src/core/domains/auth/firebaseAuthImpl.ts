import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, browserLocalPersistence, browserSessionPersistence,setPersistence, Auth, User, signOut } from 'firebase/auth';
import { firebaseApp }  from '@/core/data/auth/firebaseAuth';
import { authRepo, signInParams, signUpParams } from './firebaseAuthRepo';
import { useAuthState } from '@/utils/useAuthState';
import { authenticationMachine } from '@/core/presentation/auth/authMachine';
import { ServiceMap } from 'xstate';

const firebase = firebaseApp();
const auth = getAuth(firebase);

const services = {
  checkIfLoggedIn,
}

async function init(firebaseConfig: FirebaseOptions): Promise<void> {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  authenticationMachine.withConfig({
    //services here
    services,
  });
}

async function checkIfLoggedIn(): Promise<any> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userInfo) => {
      unsubscribe();
      console.log('checkIfLoggedIn result: ', userInfo);
      return userInfo ? resolve(userInfo) : reject('not logged in');
    });
  })
}

async function signUp(params: signUpParams): Promise<UserCredential | undefined> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, params.email, params.password);
    console.log('firebase signup success: ', userCredential);
    return userCredential;
  } catch(error) {
    console.error('firebase signup error: ', error);
  }
}

async function logIn(params: signInParams): Promise<UserCredential | undefined> {
  try {
    const { email, password, isRememberMe } = params;
    // set persistence type whether LocalStorage or Session
    // by default: firebase use LocalStorage to store
    console.log(isRememberMe ? 'set local persistant':'set session persistant');
    await setPersistence(auth, (isRememberMe ? browserLocalPersistence : browserSessionPersistence));
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('firebase login success: ', userCredential);
    return userCredential;
  } catch(error) {
    console.error('frebase login error: ', error);
  }
}

async function logOut(): Promise<void> {
  try{
    await signOut(auth);
    console.log('firebase logout success');
  } catch(error) {
    console.error('frebase logout error: ', error);
  }
}

export const firebaseAuthImpl: authRepo = {
  signUp,
  logIn,
  checkIfLoggedIn,
  logOut,
}