import { IMessage } from './Message';
export interface IConversation{
  id:string;
  messages:IMessage[]
}

export class Conversation{
  id:string;
  messages:IMessage[];
  constructor(data?:IConversation){
    this.id=data?data.id:"";
    this.messages=data?data.messages:[];
  }
}
