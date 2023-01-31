import { FirebaseApp, FirebaseOptions } from "firebase/app";
import { User } from "firebase/auth";

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
  checkIfLoggedIn(): Promise<User | Error>;
  signUp(params: SignUpParams): Promise<User | undefined>;
  logIn(params: SignInParams): Promise<User | undefined>;
  logOut(): Promise<void>;
}
