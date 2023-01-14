import { assign, createMachine, Receiver, Sender } from "xstate";
import { FetchMachineContext, FetchMachineEvent } from "./fetchState";

export const fetchMachine =

/** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAdABzADsIBLQqAYggHtCwcyA3aga3tUywBEBDNHgNoAGALqJQearBJoStcSAAeiACwBGAJw4NAVgDMaoQHZ9ADh0XTAGhABPRKYBMORxoBsplTpVGj5t2qOAL5BNhzY+ESk5BRgAE5x1HH4ADZ8yEkAtjjh3HyCogqS0rLySEqqmtr6hiZ65pY29ghqJjhGKhpdOm5G9WqebiFh6BEExGSUAGIAogAqAMIAEsJi5cUycoQKygiOeno4Pm7eOmpq6qbnKk0Oajg6Qk9CGipCbkJ6PiGhIITUEDgClyRSkmzKoF2bhwxk+53qPSMQkCNzsiAAtDptF0uk4DupHI4jGphiBcgwICkwKCSlsdohvDCkQY1AjesjHKjmo4hFj1G4BRYDgMNMFfuTxtEoDTwdtyrs1Iy3G83I43Bo9ALFXpHLcWprsTi1Kq1Y5TKTybAAK4YDBweDrMGlOWQhmmLSmXqaIkaz4qPR6wwqFx9AmK0PElQW0a4eKJOIy530hA6d04T3E0VGX1fANoloddqdDSmITmToqAU-IJAA */
createMachine< FetchMachineContext, FetchMachineEvent>(
  {
    id: "fetch",
    initial: "idle",

    context: {
      url: "",
      code: 200,
      data: "",
    },

    states: {
      "idle": {},
      "pending": {
        on: {
          FETCH: {},
        },
        invoke: {
          id: "fetchData",
          src: "fetchData",
          onDone: {
            target: "success",
            actions: "saveData",
          },
          onError: {
            target: "error",
          },
        },
      },
      "success": {},
      "error": {},
    },

    on: {
      FETCH: {
        target: "pending",
      }
    }
  },
  {
    services: {
      fetchData: (ctx, event) => async (send: Sender<FetchMachineEvent>) => {
        console.log('Fetching: ', {ctx, event});
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("response data from fetchMachine");
          },  3000);
        })
      },
    },
    actions: {
      saveData: assign({
        data: (_, event) => event.data,
      }),
    }
  }
)
