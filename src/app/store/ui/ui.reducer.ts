import { IToast } from './../../Models/Toast';
import { Loading, ShowToast, ResetToast } from './ui.actions';

import {  createReducer, on } from '@ngrx/store';
import { Toast } from 'src/app/Models/Toast';


const initialState = {
  loading: false,
  toast:<IToast>new Toast()
};

export const UIReducer = createReducer(
  initialState,
  on(Loading,(state,payload)=>{
    return {
      ...state,
      loading:payload.loading
    };
  }),
  on(ShowToast,(state,payload)=>{
    return {
      ...state,
      toast:payload.toast
    };
  }),
  on(ResetToast,(state)=>{
    return {
      ...state,
      toast:new Toast()
    };
  })
)
