import { UserCredential } from "firebase/auth";

export interface authRepo {
  login(username: string, password: string): Promise<UserCredential>;
  register(username: string, password: string): Promise<UserCredential>;
}