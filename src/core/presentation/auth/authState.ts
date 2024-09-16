import { SignInParams } from "@/core/domains/auth/firebaseAuthRepo";
import { Role } from "@/core/types/authentication";
import { User, UserCredential } from "firebase/auth";

export type AuthenticationMachineContext = {
  userDetails?: UserDetails;
  signInParams?: SignInParams;
  isError?: boolean;
  message?: string;
  role?: Role;
};

export interface UserDetails {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoUrl: string | null;
}

export type AuthEventList = 'LOG_IN' | 'LOG_OUT';

export type AuthenticationMachineEvent =
    {
      type: AuthEventList;
      data: AuthenticationMachineContext | User;
    };
