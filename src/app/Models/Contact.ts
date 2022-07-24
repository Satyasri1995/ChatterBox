import { IConversation } from './Conversation';
import { IUser } from './User';
import { IMessage } from "./Message";

export interface IContact{
  id:string;
  user:IUser;
  name:string;
  lastMessage:string;
  updatedAt:Date;
  createdAt:Date;
  conversation:IConversation;
  unread:number;
}

export class Contact{
  id:string;
  user:IUser|undefined;
  lastMessage:string|undefined;
  updatedAt:Date|undefined;
  createdAt:Date|undefined;
  conversation:IConversation|undefined;
  name:string;
  unread:number;
  constructor(data?:IContact){
    this.id=data?data.id:"";
    this.user=data?data.user:undefined;
    this.lastMessage=data?data.lastMessage:undefined;
    this.createdAt=data?data.createdAt:undefined;
    this.updatedAt=data?data.updatedAt:undefined;
    this.conversation=data?data.conversation:undefined;
    this.name=data?data.name:"";
    this.unread=data?data.unread:0;
  }
}
