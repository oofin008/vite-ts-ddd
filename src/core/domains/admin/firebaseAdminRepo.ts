import { User } from "firebase/auth";

export interface ListUsersResponse {
  nextPageToken: string;
  response: Array<User>;
  total: number;
}

export interface ListUsersParams {
  limit: number;
  page: number;
}

export interface IAdminRepo {
  listUsers(params: ListUsersParams): Promise<ListUsersResponse | Error>;
  createUser(): Promise<any>;
  // updateUser(): Promise<any>; // set user permission;
  // deleteUser(): Promise<any>;
}