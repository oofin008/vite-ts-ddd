import { FirebaseApp, FirebaseOptions } from "firebase/app";
import { UserCredential } from "firebase/auth";

export interface signInParams {
  email: string;
  password: string;
  isRememberMe: boolean;
}

export interface signUpParams extends signInParams {
  // TODO: signUp data format
}

export interface authRepo {
  // init(params: FirebaseOptions): Promise<void>;
  checkIfLoggedIn(): Promise<any>;
  signUp(params: signUpParams): Promise<UserCredential | undefined>;
  logIn(params: signInParams): Promise<UserCredential | undefined>;
  logOut(): Promise<void>;
}
