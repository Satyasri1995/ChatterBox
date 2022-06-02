import { IUser } from "./User";

export interface IMessage{
  id:string;
  sender:IUser;
  sent:boolean;
  sentDate:Date|undefined;
  receiver:IUser;
  received:boolean;
  receivedDate:Date|undefined;
  read:boolean;
  readDate:Date|undefined;
  message:string;
}

export class Message{
  id:string;
  sender:IUser|null;
  sent:boolean;
  sentDate:Date|undefined;
  receiver:IUser|null;
  received:boolean;
  receivedDate:Date|undefined;
  read:boolean;
  readDate:Date|undefined;
  message:string;
  constructor(data?:IMessage){
    this.id=data?data.id:"";
    this.sender=data?data.sender:null;
    this.sent=data?data.sent:false;
    this.sentDate=data?data.sentDate:undefined;
    this.receiver=data?data.receiver:null;
    this.received=data?data.received:false;
    this.receivedDate=data?data.receivedDate:undefined;
    this.read=data?data.read:false;
    this.readDate=data?data.readDate:undefined;
    this.message=data?data.message:"";
  }
}
