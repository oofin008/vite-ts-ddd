import React from 'react';
import {
  assign,
  createMachine,
  ErrorExecutionEvent,
  Receiver,
  Sender,
} from 'xstate';
import {
  AuthenticationMachineContext,
  AuthenticationMachineEvent,
  UserDetails,
} from './authState';
import { firebaseAuthImpl } from '@/core/domains/auth/firebaseAuthImpl';
import { User } from 'firebase/auth';
import { notification } from 'antd';
import { Role } from '@/core/types/authentication';

// to visualize state machine use cmd+p >xstate: open inspector
export const authenticationMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFmAduglgMbIED2OAdIdoQNb45QCSAZgDKlQwRM4DEEcmAoMAbqVrC0WXAWJlK1MHQbN2nbrwRjS8-OQDaABgC6xk4lAAHUrHwLLIAB6IAzAA4A7BQBMrgCz+AIwArCGeIa6eAJxBAGwANCAAnog+7tEUIUY5Pv4h-j6eQe4AvqVJ0th4RCT6ijT0jKwcXJC8fGAATl2kXRRWADYkLH0AthRVsrUKVI2qLRrtONo44nqGpuaONnYOSM5uXr4BwWERUbGJKWlRWTm5nq5xnkbugeWVGNVydeQUgw0C34ghwwh0kgoLHwXTAACNkLAwK0GNsDrt7PVHC4EB5vH5AqFwpEYvEkqkECUQhR-NE6e4jNFXEY4tEMv5PiApjUNpRAVxgZ0en0BsN0KMuhNobCEUiUTg0dZbJjyNijvjTkSLqTrhSgq5XPcHn4gkFPP5XJzub9ZvzNPw2AB5ADiAH1HQBVAAqipAGP2oBxtPcFFNnh8JVink87ji7nJbiZRqMeWiLzjAUtFS532mvIBQMYjowAiEIjWEmE0vhiORnFIGF9-qxBxxeJOhPOJKuCdxwWTRlc8XiTyZVtzPL+fMLUGL6CFvX6QxG4yhMJrcvrjdMO2VAcOuOOBLOxMuZJuCEC-goD0Hb38RmDZWz1pm9QLbQgc74TrdTAAck2e4toGiAhEE14Mv4rJxBaV7vL27g+BQdKobBHjREUcRBOU2Y4KQEBwI4r68ruewgQeAC0uqIJR1KoQxjF0lmXwyJOsxKCozTqJ+vBkSqOBqpSHg3gSYSuGy0ZxGEvY+CEyG3kOZruAyabjmxNrvnawL8fuOJxEYFBxhE+qhHEBnZEEvb6pktJ0jGTIhO4kTPqxPxvv8drLLpFH6dhN4xqEGQGe8CEXs8hlGNkj4BGyMWuCE6nufm2lFhgPmqq2iCFL2Ekhre2F+CE0QWrGSV5lOH7cHOGWCVlCDmUEAXuEFab3mFeqeHEoYPGaD7mnk-ieLhpRAA */
  createMachine<AuthenticationMachineContext, AuthenticationMachineEvent>(
    {
      id: 'authentication',
      initial: 'checkingIfLoggedIn',
      predictableActionArguments: true,
      states: {
        checkingIfLoggedIn: {
          tags: ['loading'],
          invoke: {
            id: 'checkIfLoggedIn',
            src: 'checkIfLoggedIn',
            onDone: {
              target: 'gettingRole',
              actions: ['assignUserDetailsToContext'],
            },
            onError: {
              target: 'loggedOut',
            },
          },
        },
        loggingIn: {
          tags: ['loading'],
          invoke: {
            src: 'firebaseLogin',
            id: 'firebaseLogin',
            onDone: {
              target: 'gettingRole',
              actions: ['assignUserDetailsToContext'],
            },
            onError: {
              target: 'loggingOut',
              actions: ['assignError', 'notifyError'],
            },
          },
        },
        gettingRole: {
          tags: ['loading'],
          invoke: {
            src: 'getRole',
            id: 'getRole',
            onDone: {
              target: 'loggedIn',
              actions: ['assingRoleToContext'],
            },
            onError: {
              target: 'loggingOut',
              actions: ['assignError', 'notifyError'],
            },
          }
        },
        loggedIn: {
          // entry: 'assignUserDetailsToContext',
          on: {
            LOG_OUT: {
              target: 'loggingOut',
            },
          },
        },
        loggingOut: {
          tags: ['loading'],
          invoke: {
            src: 'firebaseLogout',
            id: 'firebaseLogout',
            onDone: {
              target: 'loggedOut',
            },
            onError: {
              target: 'loggedIn',
            },
          },
        },
        loggedOut: {
          entry: ['clearContext'],
          on: {
            LOG_IN: {
              target: 'loggingIn',
            },
          },
        },
      },
    },
    {
      services: {
        checkIfLoggedIn:
          (ctx, event) => async (send: Sender<AuthenticationMachineEvent>) => {
            // Perform some async check here
            console.log('[authMachine-service] checkIfLoggedIn: ', { ctx, event });
            return firebaseAuthImpl.checkIfLoggedIn();
          },
        getRole:
          (ctx, event) => async (send: Sender<AuthenticationMachineEvent>) => {
            console.log('[authMachine-service] getRole: ', { ctx, event });
            return firebaseAuthImpl.getRole();
          },
        firebaseLogin:
          (ctx, event: AuthenticationMachineEvent) =>
          async (
            send: Sender<AuthenticationMachineEvent>,
            onReceive: Receiver<AuthenticationMachineEvent>
          ) => {
            console.log('[authMachine-service] firebaseLogin', { ctx, event });
            const { signInParams } = event.data as AuthenticationMachineContext;
            if (!signInParams) throw new Error('no signin param');
            return firebaseAuthImpl.logIn(signInParams);
          },
        firebaseLogout:
          (ctx, event) =>
          async (
            send: Sender<AuthenticationMachineEvent>,
            onReceive: Receiver<AuthenticationMachineEvent>
          ) => {
            console.log('[authMachine-service] firebaseLogout', { ctx, event });
            return firebaseAuthImpl.logOut();
          },
      },
      actions: {
        assignUserDetailsToContext: assign((ctx, event) => {
          console.log('[authMachine-action] assignUserContext: ', { ctx, event });
          const user = event.data as User;

          const userDetails: UserDetails = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          return Object.assign(ctx, { userDetails });
        }),
        assingRoleToContext: assign((ctx, event) => {
          console.log('[authMachine-action] assignRoleContext: ', { ctx, event });
          const role = event.data as Role;
          return Object.assign(ctx, { role });
        }),
        clearContext: assign((_ctx, _evt) => {
          return {};
        }),
        assignError: assign((_context, event) => {
          return {
            isError: true,
            message:
              event.data instanceof Error
                ? event.data.message
                : 'unknown error',
          };
        }),
        notifyError: (context, event) => {
          notification.error({
            message: 'Login Error',
            description: `${context.message}`,
            placement: 'topRight',
          });
        },
      },
    }
  );

export const AuthMachineContext = React.createContext<any>(null);
