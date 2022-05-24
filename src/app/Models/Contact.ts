import { IUser } from './User';
import { IMessage } from "./Message";

export interface IContact{
  id:string;
  user:IUser;
  lastMessage:IMessage;
}
