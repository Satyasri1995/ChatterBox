import { IConversation } from './Conversation';
import { IUser } from './User';
import { IMessage } from "./Message";

export interface IContact{
  id:string;
  user:IUser;
  lastMessage:IMessage;
  updatedAt:Date;
  createdAt:Date;
  conversation:IConversation;
}

export class Contact{
  id:string;
  user:IUser|null;
  lastMessage:IMessage|null;
  updatedAt:Date|undefined;
  createdAt:Date|undefined;
  conversation:IConversation|null;
  constructor(data?:IContact){
    this.id=data?data.id:"";
    this.user=data?data.user:null;
    this.lastMessage=data?data.lastMessage:null;
    this.createdAt=data?data.createdAt:undefined;
    this.updatedAt=data?data.updatedAt:undefined;
    this.conversation=data?data.conversation:null;
  }
}
