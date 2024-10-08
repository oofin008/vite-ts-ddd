import { httpsCallable } from "@firebase/functions";
import { firebaseApp } from "@/core/data/auth/firebaseApp";
import { IAdminRepo, ListUsersParams, ListUsersResponse } from "./firebaseAdminRepo";
import { getAuth } from "firebase/auth";

const { firebase, auth, db, functions } = firebaseApp;

async function listUsers(params: ListUsersParams): Promise<ListUsersResponse | Error> {
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

async function createUser(): Promise<any> {
  const callable = httpsCallable(functions, "createUser");
  const data = {
    email: "",
    password: "",
    role: "",
  };
  try {
    const response = await callable(data);
    return response;
  } catch(e) {
    console.log("firebase functions error: ", e);
  }
}

export const firebaseAdminImpl: IAdminRepo = {
  listUsers,
  createUser,
}