import { IMessage } from './Message';


export interface IIOMessage{
  conversation:string;
  message:IMessage;
}

export class IOMessage{
  conversation:string;
  message:IMessage|undefined;
  constructor(data?:IIOMessage){
    this.conversation=data?data.conversation:"";
    this.message=data?data.message:undefined;
  }
}
