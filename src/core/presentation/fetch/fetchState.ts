
export type FetchMachineContext = any;
export type FetchMachineEventList = 'FETCH' | 'RETRY';
export type FetchMachineEvent = 
{
  type: FetchMachineEventList;
  data: FetchMachineContext;
};
