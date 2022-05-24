
import {  createAction, props } from "@ngrx/store";
import { IToast } from "src/app/Models/Toast";



export const Loading = createAction(
  '[Loading] loading state',
  props<{loading:boolean}>()
)

export const ShowToast = createAction(
  '[Toast] showing toast',
  props<{toast:IToast}>()
);

export const ResetToast = createAction(
  '[Toast] Reset Toast',
)

export const RedirectToPage = createAction(
  '[Redirect] Redirect to Page',
  props<{page:string}>()
)
