import { AuthLogin, AuthLogout, UpdateUser } from './auth.actions';


import { createReducer, on } from '@ngrx/store';
import { Auth } from 'src/app/Models/Auth';


const initialState = {
  ...new Auth(),
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthLogin,(state,payload)=>{
    return {
      ...payload.auth,

    };
  }),
  on(AuthLogout,(_state)=>{
    return initialState;
  }),
  on(UpdateUser,(state,payload)=>{
    return {
      ...state,
      user:payload.user
    }
  })
)
