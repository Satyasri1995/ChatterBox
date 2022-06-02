
import {  createAction, props } from '@ngrx/store';
import { IAuth } from 'src/app/Models/Auth';


export const AuthLogin = createAction(
  '[Login] Login user',
  props<{auth:IAuth}>()
);

export const AuthLoginRest = createAction(
  '[Login] login rest call',
  props<{mail:string,password:string}>()
)

export const AuthSignUpRest = createAction(
  '[SignUp] Create new account/user',
  props<{mail:string,password:string}>()
)

export const AuthLogout = createAction('[Logout] logout user');
