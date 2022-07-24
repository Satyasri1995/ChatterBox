import { ShowToast } from './../../store/ui/ui.actions';
import { Toast } from 'src/app/Models/Toast';
import { IConversation } from './../../Models/Conversation';

import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './../../services/util/socket.service';
import {
  SelectContact,
  UpdateMessage,
  AddContactRest,
  SendMessageRest,
  EditContactRest,
  DeleteContactRest,
} from './../../store/chat/chat.actions';
import {
  messageSelector,
  currentChatUserSelector,
  ConversationSelector,
} from './../../store/chat/chat.selectors';
import { IUser, User } from './../../Models/User';
import {
  userContactsSelector,
  userSelector,
} from './../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { IMessage, Message } from '../../Models/Message';
import { IContact } from '../../Models/Contact';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppState } from 'src/app/store/app.store';
import { Subscription, map } from 'rxjs';
import { SetLastMessage } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  contactsMenuItems: MenuItem[];
  contacts: IContact[];
  messages: IMessage[];
  user: IUser;
  currentChatUser!: IUser;
  showAddContact: boolean;
  searchResult: string;
  searchResultUsers: IUser[];
  userSub!: Subscription;
  contactsSub!: Subscription;
  messagesSub!: Subscription;
  currentChatUserSub!: Subscription;
  conversationUpdateSub!: Subscription;
  messageErrorSub!: Subscription;
  selectedContact!: { userId: string; name: string ,lastMessage:string,id:string};
  conversationSub!: Subscription;
  currentConversation!: IConversation;
  showEditContact: boolean;
  showDeleteContact: boolean;

  constructor(
    private store: Store<AppState>,
    private socketService: SocketService,
    private http: HttpClient
  ) {
    this.resetSelectedContact();
    this.searchResultUsers = [];
    this.searchResult = 'Enter mail in above field to find contact';
    this.contactsMenuItems = [
      {
        label: 'Add Contact',
        icon: 'pi pi-fw pi-user-plus',
        command: () => {
          this.showAddContact = true;
        },
      },
      {
        label: 'Edit Contact',
        icon: 'pi pi-fw pi-user-edit',
        command: () => {
          this.showEditContact = true;
        },
      },
      {
        label: 'Delete Contact',
        icon: 'pi pi-fw pi-user-minus',
        command: () => {
          this.showDeleteContact = true;
        },
      },
    ];
    this.contacts = [];
    this.messages = [];
    this.user = new User();
    this.showAddContact = false;
    this.showEditContact = false;
    this.showDeleteContact = false;
  }

  search(query: string) {
    this.http
      .post(environment.api + '/contact/search', { query: query })
      .subscribe((response: any) => {
        this.searchResultUsers = response.data;
      });
  }

  onSelected(user: IUser) {
    this.selectedContact.userId = user.id;
  }

  ngOnInit(): void {
    this.userSub = this.store
      .pipe(map((state) => userSelector(state)))
      .subscribe((user: IUser) => {
        this.user = user;
      });
    this.contactsSub = this.store
      .pipe(map((state) => userContactsSelector(state)))
      .subscribe((contacts: IContact[]) => {
        this.contacts = contacts;
      });

    this.currentChatUserSub = this.store
      .pipe(map((state) => currentChatUserSelector(state)))
      .subscribe((user: IUser) => {
        this.currentChatUser = user;
      });
    this.conversationSub = this.store
      .pipe(map((state) => ConversationSelector(state)))
      .subscribe((conversation: IConversation) => {
        this.currentConversation = conversation;
        this.messages=conversation.messages;
      });
    this.messageErrorSub = this.socketService.errorMessage.subscribe(
      (error) => {
        const toast = new Toast();
        toast.severity = 'error';
        toast.detail = error;
        toast.show = true;
        toast.summary = 'Error';
        this.store.dispatch(ShowToast({ toast: toast }));
      }
    );
    this.socketService.getSocket().on("room:update",(data:any) => {
      this.store.dispatch(UpdateMessage({ message: data.message }));
      this.selectedContact.lastMessage=data.message.message;
      const cId = this.contacts.findIndex(c=>c.id==this.selectedContact.id);
      if(cId>=0){
        this.store.dispatch(SetLastMessage({idx:cId,message:data.message.message}))
      }
    })
  }

  resetSelectedContact() {
    this.selectedContact = { userId: '', name: '' ,lastMessage:"",id:""};
  }

  setCurrentChatUser(contact: IContact) {
    if (this.currentChatUser?.id !== contact.id) {
      this.selectedContact.name=contact.name;
      this.selectedContact.id=contact.id;
      this.socketService.leaveRoom(contact.conversation);
      this.store.dispatch(SelectContact({ contact: contact ,userId:this.user.id}));
      this.socketService.joinRoom(contact.conversation);
    }
  }

  sendMessage(message: string) {
    const newMsg = new Message();
    newMsg.message = message;
    newMsg.sender = this.user;
    newMsg.receiver = this.currentChatUser;
    this.store.dispatch(
      SendMessageRest({
        conversationId: this.currentConversation.id,
        message: newMsg,
      })
    );
    let input = document.getElementById("messageInput") as HTMLInputElement;
    input.value="";
  }

  addContact() {
    this.store.dispatch(AddContactRest(this.selectedContact));
    this.showAddContact = false;
  }

  EditContact() {
    this.store.dispatch(EditContactRest(this.selectedContact));
    this.showEditContact = false;
  }

  deleteContact() {
    this.store.dispatch(DeleteContactRest(this.selectedContact));
    this.showDeleteContact = true;
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
    this.contactsSub?.unsubscribe();
    this.messagesSub?.unsubscribe();
    this.currentChatUserSub?.unsubscribe();
    this.conversationSub?.unsubscribe();
    this.messageErrorSub?.unsubscribe();
  }

  ngAfterViewChecked() {
    let element = document.querySelector(
      '#contact .p-dialog-content'
    ) as HTMLDivElement;
    if (element) {
      element.style.overflow = 'visible';
    }
  }
}
