import { IContact } from "./Contact";

export interface IUser{
  mail:string;
  id:string;
  isOnline:boolean;
  contacts:IContact[]
}

export class User{

  mail:string;
  id:string;
  isOnline:boolean;
  contacts:IContact[];
  constructor(data?:IUser){
    this.mail=data?data.mail:"";
    this.id=data?data.mail:"";
    this.isOnline=data?data.isOnline:false;
    this.contacts=data?data.contacts:[];
  }
}
