import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  contactsMenuItems: MenuItem[];
  contacts: {
    name: string;
    id: string;
    msg: { message: string; messageDate: Date; read: boolean };
  }[];

  constructor() {
    this.contactsMenuItems = [
      { label: 'New Contact', icon: 'pi pi-fw pi-user-plus' },
      { label: 'Edit Contact', icon: 'pi pi-fw pi-user-edit' },
      { label: 'Delete Contact', icon: 'pi pi-fw pi-trash' },
    ];
    this.contacts = [
      {
        name: 'Dvs',
        id: Math.random().toString(),
        msg: { message: 'Hello', messageDate: new Date(), read: false },
      },
      {
        name: 'Davuloori Sai Durga Hemanth',
        id: Math.random().toString(),
        msg: { message: 'Hello good morning how are doing? is everything okay?', messageDate: new Date(), read: false },
      },
      {
        name: 'Dvs',
        id: Math.random().toString(),
        msg: { message: 'Hello', messageDate: new Date(), read: false },
      },
      {
        name: 'Davuloori Sai Durga Hemanth',
        id: Math.random().toString(),
        msg: { message: 'Hello good morning how are doing? is everything okay?', messageDate: new Date(), read: false },
      },
      {
        name: 'Dvs',
        id: Math.random().toString(),
        msg: { message: 'Hello', messageDate: new Date(), read: false },
      },
      {
        name: 'Davuloori Sai Durga Hemanth',
        id: Math.random().toString(),
        msg: { message: 'Hello good morning how are doing? is everything okay?', messageDate: new Date(), read: false },
      },
      {
        name: 'Dvs',
        id: Math.random().toString(),
        msg: { message: 'Hello', messageDate: new Date(), read: false },
      },
      {
        name: 'Davuloori Sai Durga Hemanth',
        id: Math.random().toString(),
        msg: { message: 'Hello good morning how are doing? is everything okay?', messageDate: new Date(), read: false },
      },
      {
        name: 'Dvs',
        id: Math.random().toString(),
        msg: { message: 'Hello', messageDate: new Date(), read: false },
      },
      {
        name: 'Davuloori Sai Durga Hemanth',
        id: Math.random().toString(),
        msg: { message: 'Hello good morning how are doing? is everything okay?', messageDate: new Date(), read: false },
      },
      {
        name: 'Dvs',
        id: Math.random().toString(),
        msg: { message: 'Hello', messageDate: new Date(), read: false },
      },
      {
        name: 'Davuloori Sai Durga Hemanth',
        id: Math.random().toString(),
        msg: { message: 'Hello good morning how are doing? is everything okay?', messageDate: new Date(), read: false },
      },
      {
        name: 'Dvs',
        id: Math.random().toString(),
        msg: { message: 'Hello', messageDate: new Date(), read: false },
      },
      {
        name: 'Davuloori Sai Durga Hemanth',
        id: Math.random().toString(),
        msg: { message: 'Hello good morning how are doing? is everything okay?', messageDate: new Date(), read: false },
      },
    ];
  }

  ngOnInit(): void {}
}
