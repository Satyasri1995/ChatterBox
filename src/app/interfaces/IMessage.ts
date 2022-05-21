import { IUser } from "./IUser";

export interface IMessage{
  id:string;
  sentDate:Date|null;
  receivedDate:Date|null;
  readDate:Date|null;
  text:string;
  user:IUser;
}
