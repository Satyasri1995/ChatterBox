import { IConversation } from './../../Models/Conversation';

import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './../../services/util/socket.service';
import {
  SelectContact,
  UpdateMessage,
  AddContactRest,
  SendMessageRest,
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
import { IIOMessage } from 'src/app/Models/IOMessage';

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
  selectedContact!: { userId: string; name: string };
  conversationSub!: Subscription;
  currentConversation!: IConversation;

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
        label: 'New Contact',
        icon: 'pi pi-fw pi-user-plus',
        command: () => {
          this.showAddContact = true;
        },
      },
      { label: 'Edit Contact', icon: 'pi pi-fw pi-user-edit' },
      { label: 'Delete Contact', icon: 'pi pi-fw pi-trash' },
    ];
    this.contacts = [];
    this.messages = [];
    this.user = new User();
    this.showAddContact = false;
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
    this.messagesSub = this.store
      .pipe(map((state) => messageSelector(state)))
      .subscribe((messages: IMessage[]) => {
        this.messages = messages;
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
      });
  }

  resetSelectedContact() {
    this.selectedContact = { userId: '', name: '' };
  }

  setCurrentChatUser(contact: IContact) {
    this.store.dispatch(SelectContact({ contact: contact }));
    this.reSubScribeConversationUpdate(contact.conversation.id);
  }

  reSubScribeConversationUpdate(id: string) {
    this.conversationUpdateSub?.unsubscribe();
    this.conversationUpdateSub = this.socketService
      .getSocket()
      .fromEvent<IIOMessage>(`conversation:${id}:update`)
      .subscribe((ioMessage: IIOMessage) => {
        this.store.dispatch(UpdateMessage({ message: ioMessage.message }));
      });
  }

  sendMessage(message: string) {
    const newMsg = new Message();
    newMsg.message = message;
    newMsg.sender = this.user;
    newMsg.receiver = this.currentChatUser;
    this.store.dispatch(
      SendMessageRest({ conversationId: this.currentConversation.id, message: newMsg })
    );
  }

  addContact() {
    console.log(this.selectedContact);
    this.store.dispatch(AddContactRest(this.selectedContact));
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
    this.contactsSub?.unsubscribe();
    this.messagesSub?.unsubscribe();
    this.currentChatUserSub?.unsubscribe();
    this.conversationSub?.unsubscribe();
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
