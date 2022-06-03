import { IConversation } from './../Models/Conversation';
import { IContact } from './../Models/Contact';
import { IAuth } from "../Models/Auth"
import { IToast } from "../Models/Toast"


export interface AuthState extends IAuth{

}

export interface UIState{
  loading:boolean;
  toast:IToast;
}

export interface ChatState{
  contact:IContact;
  conversation:IConversation;
}
