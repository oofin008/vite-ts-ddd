import React from 'react';
import { assign, createMachine, Sender } from 'xstate';
import { AuthenticationMachineContext, AuthenticationMachineEvent } from './authState';

// to visualize state machine use cmd+p >xstate: open inspector
export const authenticationMachine = createMachine<
  AuthenticationMachineContext,
  AuthenticationMachineEvent
>(
  {
    id: 'authentication',
    initial: 'checkingIfLoggedIn',
    states: {
      checkingIfLoggedIn: {
        invoke: {
          src: 'checkIfLoggedIn',
          onError: {
            target: 'loggedOut',
          },
        },
        on: {
          REPORT_IS_LOGGED_IN: {
            target: 'loggedIn',
            actions: 'assignUserDetailsToContext',
          },
          REPORT_IS_LOGGED_OUT: 'loggedOut',
        },
      },
      loggedIn: {
        on: {
          LOG_OUT: {
            target: 'loggedOut',
          },
        },
      },
      loggedOut: {
        entry: ['navigateToAuthPage', 'clearUserDetailsFromContext'],
        on: {
          LOG_IN: {
            target: 'loggedIn',
            actions: 'assignUserDetailsToContext',
          },
        },
      },
    },
  },
  {
    services: {
      checkIfLoggedIn: () => async (
        send: Sender<AuthenticationMachineEvent>,
      ) => {
        // Perform some async check here
        // if (isLoggedIn) {
        //   send({
        //     type: "REPORT_IS_LOGGED_IN",
        //     userDetails: {
        //       username: "mpocock1",
        //     },
        //   });
        // } else {
        //   send({
        //     type: "REPORT_IS_LOGGED_OUT",
        //   });
        // }
      },
    },
    actions: {
      navigateToAuthPage: () => {
        // When the user is logged out, we
        // should take them to the /auth route
      },
      assignUserDetailsToContext: assign((context, event) => {
        if (event.type !== 'REPORT_IS_LOGGED_IN') {
          return {};
        }
        return {
          userDetails: event.userDetails,
        };
      }),
      clearUserDetailsFromContext: assign((context, event) => {
       return { userDetails: undefined };
      }),
    },
  },
);

export const AuthMachineContext = React.createContext<any>(null);
