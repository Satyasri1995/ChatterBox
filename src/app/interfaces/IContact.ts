import { IUser } from './IUser';
import { IMessage } from "./IMessage";

export interface IContact{
  id:string;
  user:IUser;
  lastMessage:IMessage;
}
