
export type FetchMachineContext = {
  url: string;
  code?: number,
  data?: any;
};

export type FetchMachineEventList = 'FETCH' | 'RETRY';
export type FetchMachineEvent = 
{
  type: FetchMachineEventList;
  data: FetchMachineContext;
};
