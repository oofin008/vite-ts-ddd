import { SignInParams } from "@/core/domains/auth/firebaseAuthRepo";

export type AuthenticationMachineContext = {
  userDetails?: UserDetails;
  signInParams?: SignInParams;
};

export interface UserDetails {
  username: string;
}

export interface Result {
  isError: boolean;
  message: string;
}

export type AuthEventList = 'LOG_IN' | 'LOG_OUT'

export type AuthenticationMachineEvent =
    {
      type: AuthEventList;
      data: AuthenticationMachineContext;
    };
