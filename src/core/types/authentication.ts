import type { EventObject, SendAction, ServiceMap, State } from "xstate";
import { AuthenticationMachineContext, AuthenticationMachineEvent } from '@/core/presentation/auth/authState';

export type IAuthContext<TContext,TEvent extends EventObject,TSentEvent extends EventObject> = [
  State<TContext>, 
  SendAction<TContext, TEvent, TSentEvent>,
  ServiceMap,
];

export type AuthContext = IAuthContext<AuthenticationMachineContext, AuthenticationMachineEvent, AuthenticationMachineEvent>;
