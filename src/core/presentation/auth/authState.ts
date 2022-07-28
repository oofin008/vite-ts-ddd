export type AuthenticationMachineContext = {
  userDetails?: UserDetails;
};

export interface UserDetails {
  username: string;
}

export type AuthenticationMachineEvent =
    {
      type: 'REPORT_IS_LOGGED_IN';
      data: UserDetails;
    }
  | {
      type: 'REPORT_IS_LOGGED_OUT';
    }
  | {
      type: 'LOG_OUT';
    }
  | {
      type: 'LOG_IN';
      data: UserDetails;
    };
