import { IUser, User } from './User';
export interface IAuth{
  user:IUser,
  isLoggedIn:boolean,
  token:string
}

export class Auth{
  user:IUser;
  isLoggedIn:boolean;
  token:string;
  constructor(data?:IAuth){
    this.user=data?new User(data.user):new User();
    this.isLoggedIn=data?data.isLoggedIn:false;
    this.token=data?data.token:""
  }
}
