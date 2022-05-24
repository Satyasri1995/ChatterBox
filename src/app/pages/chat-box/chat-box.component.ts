import { IUser } from '../../Models/User';
import { IMessage } from '../../Models/Message';
import { IContact } from '../../Models/Contact';
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
  showAddContact:boolean;
  searchResult:string;
  searchResultUsers:IUser[];
  selectedSearchUser!:IUser;

  constructor() {
    this.searchResultUsers=[]
    this.searchResult="Enter mail in above field to find contact";
    this.contactsMenuItems = [
      { label: 'New Contact', icon: 'pi pi-fw pi-user-plus' },
      { label: 'Edit Contact', icon: 'pi pi-fw pi-user-edit' },
      { label: 'Delete Contact', icon: 'pi pi-fw pi-trash' },
    ];
    this.contacts = [
      {
        user:{mail:"Dvs2",id:Math.random().toString(),isOnline:true},
        id: Math.random().toString(),
        lastMessage: {
          id: Math.random.toString(),
          sentDate: new Date(),
          receivedDate: new Date(),
          readDate: new Date(),
          text: 'Hello ' + Math.random().toString(),
          user:{mail:"Dvs2",id:Math.random().toString(),isOnline:true}
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
        user:{mail:"Dvs2",id:Math.random().toString(),isOnline:true}
      },
      {
        id: Math.random.toString(),
        sentDate: new Date(),
        receivedDate: new Date(),
        readDate: new Date(),
        text: 'Hello ' + Math.random().toString(),
        user:{mail:"Dvs",id:"123456789",isOnline:true}
      },
    ];
    this.user={
      mail:"Dvs",
      id:"123456789",
      isOnline:true
    }
    this.showAddContact=true;
  }

  search(query:string){
    setTimeout(()=>{
      this.searchResultUsers=[
        {mail:"satyasri.125110044@gmail.com",id:Math.random().toString(),isOnline:false},
        {mail:"dvs.9491891167@gmail.com",id:Math.random().toString(),isOnline:false},
      ]
    },1000)
  }

  onSelected(event:IUser){
    this.selectedSearchUser=event;
  }

  ngOnInit(): void {}

  ngAfterViewChecked(){
    let element=document.querySelector("#contact .p-dialog-content") as HTMLDivElement;
    if(element){
      element.style.overflow="visible";
    }
  }
}
