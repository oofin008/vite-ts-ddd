import { httpsCallable } from "@firebase/functions";
import { firebaseApp } from "@/core/data/auth/firebaseApp";
import { CreateUserParams, IAdminRepo, ListUsersParams, ListUsersResponse } from "./firebaseAdminRepo";
import { getAuth } from "firebase/auth";

const { firebase, auth, db, functions } = firebaseApp;

async function listUsers(params: ListUsersParams): Promise<ListUsersResponse> {
  const callable = httpsCallable<ListUsersParams, ListUsersResponse>(functions, "listUsers");
  const { page = 1, limit = 10 } = params;
  const data = {
    limit,
    page,
  };
  try {
    const response = await callable(data);
    return response.data;
  } catch(e) {
    console.log("firebase functions error: ", e);
    throw e;
  }
}

async function createUser(params: CreateUserParams): Promise<boolean> {
  const callable = httpsCallable(functions, "createUser");
  try {
    const response = await callable(params);
    // return response;
    return true;
  } catch(e) {
    console.log("firebase functions error: ", e);
    throw e;
  }
}

export const firebaseAdminImpl: IAdminRepo = {
  listUsers,
  createUser,
}