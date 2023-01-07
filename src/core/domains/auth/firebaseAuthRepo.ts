import { FirebaseApp, FirebaseOptions } from "firebase/app";
import { UserCredential } from "firebase/auth";

export interface SignInParams {
  email: string;
  password: string;
  isRememberMe: boolean;
}

export interface SignUpParams extends SignInParams {
  // TODO: signUp data format
}

export interface IAuthRepo {
  // init(params: FirebaseOptions): Promise<void>;
  checkIfLoggedIn(): Promise<any>;
  signUp(params: SignUpParams): Promise<UserCredential | undefined>;
  logIn(params: SignInParams): Promise<UserCredential | undefined>;
  logOut(): Promise<void>;
}
