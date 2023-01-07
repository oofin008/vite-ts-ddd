import React from "react";
import { assign, createMachine, Receiver, Sender } from "xstate";
import {
  AuthenticationMachineContext,
  AuthenticationMachineEvent,
} from "./authState";
import { firebaseAuthImpl } from "@/core/domains/auth/firebaseAuthImpl";

// to visualize state machine use cmd+p >xstate: open inspector
export const authenticationMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFmAduglgMbIED2OAdIdoQNb45QCSAZgDKlQwRM4DEEcmAoMAbqVrC0WXAWJlK1MHQbN2nbrwRjS8-OQDaABgC6xk4lAAHUrHwLLIAB6IAzAA4A7BQBMrgCz+AIwArCGeIa6eAJxBAGwANCAAnog+7tEUIUY5Pv4h-j6eQe4AvqVJ0th4RCT6ijT0jKwcXJC8fGAATl2kXRRWADYkLH0AthRVsrUKVI2qLRrtONo44nqGpuaONnYOSM5uXr4BwWERUbGJKWlRWTm5nq5xnkbugeWVGNVydeQUgw0C34ghwwh0kgoLHwXTAACNkLAwK0GNsDrt7PVHC4EB5vH5AqFwpEYvEkqkECUQhR-NE6e4jNFXEY4tEMv5PiApjUNpRAVxgZ0en0BsN0KMuhNobCEUiUTg0dZbJjyNijvjTkSLqTrhSgq5XPcHn4gkFPP5XJzub9ZvzNPw2AB5ADiAH1HQBVAAqipAGP2oBxtPcFFNnh8JVink87ji7nJbiZRqMeWiLzjAUtFS532mvIBQMYjowAiEIjWEmE0vhiORnFIGF9-qxBxxeJOhPOJKuCdxwWTRlc8XiTyZVtzPL+fMLUGL6CFvX6QxG4yhMJrcvrjdMO2VAcOuOOBLOxMuZJuCEC-goD0Hb38RmDZWz1pm9QLbQgc74TrdTAAck2e4toGiAhEE14Mv4rJxBaV7vL27g+BQdKobBHjREUcRBOU2Y4KQEBwI4r68ruewgQeAC0uqIJR1KoQxjF0lmXwyJOsxKCozTqJ+vBkSqOBqpSHg3gSYSuGy0ZxGEvY+CEyG3kOZruAyabjmxNrvnawL8fuOJxEYFBxhE+qhHEBnZEEvb6pktJ0jGTIhO4kTPqxPxvv8drLLpFH6dhN4xqEGQGe8CEXs8hlGNkj4BGyMWuCE6nufm2lFhgPmqq2iCFL2Ekhre2F+CE0QWrGSV5lOH7cHOGWCVlCDmUEAXuEFab3mFeqeHEoYPGaD7mnk-ieLhpRAA */
  createMachine<AuthenticationMachineContext, AuthenticationMachineEvent>(
    {
      id: "authentication",
      initial: "checkingIfLoggedIn",
      states: {
        checkingIfLoggedIn: {
          invoke: {
            src: "checkIfLoggedIn",
            onDone: {
              target: "loggedIn",
            },
            onError: {
              target: "loggedOut",
            },
          },
        },
        loggingIn: {
          invoke: {
            src: "firebaseLogin",
            id: "firebaseLogin",
            onDone: {
              target: "loggedIn",
            },
            onError: {
              target: "loggingOut",
            },
          },
        },
        loggedIn: {
          entry: "assignUserDetailsToContext",
          on: {
            LOG_OUT: {
              target: "loggingOut",
            },
          },
        },
        loggingOut: {
          invoke: {
            src: "firebaseLogout",
            id: "firebaseLogout",
            onDone:
              {
                target: "loggedOut",
              },
            onError:
              {
                target: "loggedIn",
              },
          },
        },
        loggedOut: {
          entry: [
            "clearUserDetailsFromContext",
            "navigateToAuthPage",
          ],
          on: {
            LOG_IN: {
              target: "loggingIn",
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
            console.log("checking: ", { ctx, event });
            return firebaseAuthImpl.checkIfLoggedIn();
          },
        firebaseLogin:
          (ctx, event: AuthenticationMachineEvent) =>
          async (
            send: Sender<AuthenticationMachineEvent>,
            onReceive: Receiver<AuthenticationMachineEvent>
          ) => {
            console.log("logginIn", { ctx, event });
            const { signInParams } = event.data;
            if (!signInParams) throw new Error("no signin param");
            return firebaseAuthImpl.logIn(signInParams);
          },
        firebaseLogout:
          (ctx, event) =>
          async (
            send: Sender<AuthenticationMachineEvent>,
            onReceive: Receiver<AuthenticationMachineEvent>
          ) => {
            return firebaseAuthImpl.logOut();
          },
      },
      actions: {
        navigateToAuthPage: () => {
          // When the user is logged out, we
          // should take them to the /auth route
        },
        assignUserDetailsToContext: assign((ctx, event) => {
          return { userDetails: event.data.userDetails };
        }),
        clearUserDetailsFromContext: assign((context, event) => {
          return { userDetails: undefined };
        }),
      },
    }
  );

export const AuthMachineContext = React.createContext<any>(null);
