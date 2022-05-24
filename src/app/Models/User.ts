export interface IUser{
  mail:string;
  id:string;
  isOnline:boolean;
}

export class User{

  mail:string;
  id:string;
  isOnline:boolean;
  constructor(data?:IUser){
    this.mail=data?data.mail:"";
    this.id=data?data.mail:"";
    this.isOnline=data?data.isOnline:false;
  }
}
