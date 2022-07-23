import { IIOMessage } from './../../Models/IOMessage';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket:Socket) { }

  public receiveMessage = this.socket.fromEvent<IIOMessage>("message:receive");
  public errorMessage = this.socket.fromEvent<string>('message:error');


  sendMessage(ioMessage:IIOMessage){
    this.socket.emit("message:send",ioMessage);
  }

  markAsReceivedMessage(ioMessage:IIOMessage){
    this.socket.emit("message:receive",ioMessage);
  }

  markAsReadMessage(ioMessage:IIOMessage){
    this.socket.emit("message:read",ioMessage);
  }

  getSocket(){
    return this.socket;
  }


}
