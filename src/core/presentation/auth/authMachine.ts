import React from 'react';
import { assign, createMachine, Sender } from 'xstate';
import { AuthenticationMachineContext, AuthenticationMachineEvent } from './authState';
import { firebaseAuthImpl } from '@/core/domains/auth/firebaseAuthImpl';

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
          onDone: { target: 'loggedIn', actions: 'assignUserDetailsToContext' },
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
      loggingOut: {},
      loggedOut: {
        entry: ['logOutFirebase', 'navigateToAuthPage', 'clearUserDetailsFromContext'],
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
      checkIfLoggedIn: (ctx, event) => async (
        send: Sender<AuthenticationMachineEvent>,
      ) => {
        // Perform some async check here
        console.log('checking: ', {ctx, event});
        return firebaseAuthImpl.checkIfLoggedIn()
      },
    },
    actions: {
      navigateToAuthPage: () => {
        // When the user is logged out, we
        // should take them to the /auth route
      },
      assignUserDetailsToContext: assign((context, event) => {
        console.log('assing: ', {context, event});
        if (event.type !== 'REPORT_IS_LOGGED_IN') {
          return {};
        }
        return {
          userDetails: event.data,
        };
      }),
      clearUserDetailsFromContext: assign((context, event) => {
       return { userDetails: undefined };
      }),
      logOutFirebase: async (context, event) => {
        console.log('AuthMachine Logging Out: ', {context, event});
        firebaseAuthImpl.logOut();
      }
    },
  },
);

export const AuthMachineContext = React.createContext<any>(null);
