import { IUser } from './../../interfaces/IUser';
import { IMessage } from './../../interfaces/IMessage';
import { IContact } from './../../interfaces/IContact';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  contactsMenuItems: MenuItem[];
  contacts: IContact[];
  messages: IMessage[];
  user:IUser;
  currentChatUser!:IUser;

  constructor() {
    this.contactsMenuItems = [
      { label: 'New Contact', icon: 'pi pi-fw pi-user-plus' },
      { label: 'Edit Contact', icon: 'pi pi-fw pi-user-edit' },
      { label: 'Delete Contact', icon: 'pi pi-fw pi-trash' },
    ];
    this.contacts = [
      {
        user:{name:"Dvs2",id:Math.random().toString(),isOnline:true},
        id: Math.random().toString(),
        lastMessage: {
          id: Math.random.toString(),
          sentDate: new Date(),
          receivedDate: new Date(),
          readDate: new Date(),
          text: 'Hello ' + Math.random().toString(),
          user:{name:"Dvs2",id:Math.random().toString(),isOnline:true}
        },
      },
    ];
    this.messages = [
      {
        id: Math.random.toString(),
        sentDate: new Date(),
        receivedDate: new Date(),
        readDate: new Date(),
        text: 'Hello ' + Math.random().toString(),
        user:{name:"Dvs2",id:Math.random().toString(),isOnline:true}
      },
      {
        id: Math.random.toString(),
        sentDate: new Date(),
        receivedDate: new Date(),
        readDate: new Date(),
        text: 'Hello ' + Math.random().toString(),
        user:{name:"Dvs",id:"123456789",isOnline:true}
      },
    ];
    this.user={
      name:"Dvs",
      id:"123456789",
      isOnline:true
    }
  }

  ngOnInit(): void {}
}
