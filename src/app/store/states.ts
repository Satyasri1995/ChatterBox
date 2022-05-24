import { IAuth } from "../Models/Auth"
import { IToast } from "../Models/Toast"


export interface AuthState extends IAuth{

}

export interface UIState{
  loading:boolean
  toast:IToast
}
