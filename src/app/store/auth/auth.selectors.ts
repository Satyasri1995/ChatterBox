import { createSelector } from "@ngrx/store";
import { IUser } from "src/app/Models/User";
import { AppState } from "../app.store";
import { AuthState } from "../states";


export const authSelector = (state: AppState) => state.auth;

export const userSelector = createSelector(
  authSelector,
  (state: AuthState) => state.user
);

export const userIdSelector=createSelector(
  userSelector,
  (state:IUser)=>state.id
)
export const userMailSelector=createSelector(
  userSelector,
  (state:IUser)=>state.mail
)



export const isLoggedInSelector = createSelector(
  authSelector,
  (state: AuthState) => state.isLoggedIn
);

export const validUserSelector = createSelector(
  userSelector,
  (state:IUser)=>!!state.id
)
