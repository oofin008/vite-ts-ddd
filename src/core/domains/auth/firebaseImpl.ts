import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp }  from '../../../utils/firebaseAuth';

const auth = getAuth(firebaseApp);

interface signInParams {
  email: string;
  password: string;
}

interface signUpParams extends signInParams {
  // TODO: signUp data format
}

export async function signup(params: signUpParams) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, params.email, params.password);
    console.log('firebase signup success: ', userCredential);
    return userCredential;
  } catch(error) {
    console.error('firebase signup error: ', error);
  }
}

export async function signin(params: signInParams) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, params.email, params.password);
    console.log('firebase login success: ', userCredential);
    return userCredential;
  } catch(error) {
    console.error('frebase login error: ', error);
  }
}
