import { assign, createMachine, Receiver, Sender } from "xstate";
import { FetchMachineContext, FetchMachineEvent } from "./fetchState";

export const fetchMachine =

/** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAdASwgBswBiAMQFEAVAYQAkBtABgF1FQAHAe1jzTy4A7diAAeiAIwBmAGw4ArBPkyJAJikAWAJyqmM1QBoQAT0kB2LQqbXVZmRplSAHLI0BfN0dSZcHMIIg8QSgSCCEwfEEANy4AawjvbAARAEM0FOY2JBBuXn4hEXEEeTMmHA09VRkmJSkmXSkjUwRpKRxrGw1VeS09CzMPL3RsHD8AoJCwACcprinRwjTkOYBbHESsVPTMkVy+AWFsouk5RWU1TR1KpsQnCSsbJiczCTN5VVtBkA2cadmpkgAJWogIAmjtsnt8odQMdZAolCp1NpdPobi1VJYOkw6h8mPI7mZVB5PCBBFwIHARBtdjx9gUjogALQydFM+Q4LRc7k8nlSL4-AjEWl5A6FRAaJztRFMIlSLTyd5PdESJxlbG2eyOFwyAakn5jQLBEX0mFiRB1DlMLRSIkSa29E4qp4PerveQaKR1SUC4a4WAAVwwGDg8EhdOh4oQZgqOCkDU1ZikEk9jRMkjqODeNi0FVUqdtvp8vxmcxNkcZCC66KccieXp6SbeMkc8hJbiAA */
createMachine< FetchMachineContext, FetchMachineEvent>(
  {
    id: "fetch",
    initial: "idle",
    states: {
      "idle": {
        on: {
          FETCH: {
            target: "pending"
          }
        }
      },
      "pending": {
        invoke: {
          id: "fetchData",
          src: "fetchData",
          onDone: {
            target: "success",
          },
          onError: {
            target: "error",
          },
        },
      },
      "success": {
        type: "final",
      },
      "error": {
        on: {
          RETRY: {
            target: "pending",
          },
        }
      },
    }
  },
  {
    services: {
      fetchData: (ctx, event) => async (send: Sender<FetchMachineEvent>) => {
        console.log('Fetching: ', {ctx, event});
      },
    }
  }
)
