import { Role } from "@/core/types/authentication";

export interface User {
  id: string;
  email: string;
  role: string;
}
export interface ListUsersResponse {
  nextPageToken: string;
  response: Array<User>;
  total: number;
}

export interface ListUsersParams {
  limit: number;
  page: number;
}

export interface CreateUserParams {
  email: string;
  password: string;
  role: Role;
}

export interface IAdminRepo {
  listUsers(params: ListUsersParams): Promise<ListUsersResponse>;
  createUser(params: CreateUserParams): Promise<boolean>;
  testUpload(fileBuffer: string): Promise<any>;
  testSignUrl(): Promise<string>;
  // updateUser(): Promise<any>; // set user permission;
  // deleteUser(): Promise<any>;
}