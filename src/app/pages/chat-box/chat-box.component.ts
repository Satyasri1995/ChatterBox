import { IUser } from './../../Models/User';
import { userSelector } from './../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { IMessage } from '../../Models/Message';
import { IContact } from '../../Models/Contact';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppState } from 'src/app/store/app.store';
import { Subscription, map } from 'rxjs';

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
  selectedSearchUser!: IUser;
  userSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.searchResultUsers = [];
    this.searchResult = 'Enter mail in above field to find contact';
    this.contactsMenuItems = [
      { label: 'New Contact', icon: 'pi pi-fw pi-user-plus' },
      { label: 'Edit Contact', icon: 'pi pi-fw pi-user-edit' },
      { label: 'Delete Contact', icon: 'pi pi-fw pi-trash' },
    ];
    this.contacts = [];
    this.messages = [];
    this.user = {
      mail: 'Dvs',
      id: '123456789',
      isOnline: true,
      contacts:[]
    };
    this.showAddContact = false;
  }

  search(query: string) {
    setTimeout(() => {
      this.searchResultUsers = [
      ];
    }, 1000);
  }

  onSelected(event: IUser) {
    this.selectedSearchUser = event;
  }

  ngOnInit(): void {
    this.userSub = this.store
      .pipe(map((state) => userSelector(state)))
      .subscribe((user: IUser) => {
        this.user = user;
      });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
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
