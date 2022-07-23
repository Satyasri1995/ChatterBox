import { UpdateUser } from './../auth/auth.actions';
import { SocketService } from './../../services/util/socket.service';
import { Conversation } from './../../Models/Conversation';
import { environment } from 'src/environments/environment';
import { switchMap, mergeMap, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  UpdateMessages,
  UpdateMessagesRest,
  SelectContact,
  AddContactRest,
  UpdateContactUser,
  UpdateContact,
  EditContactRest,
  DeleteContactRest,
  SendMessageRest,
} from './chat.actions';
import { IMessage } from 'src/app/Models/Message';
import { User } from 'src/app/Models/User';
import { Toast } from 'src/app/Models/Toast';
import { ShowToast } from '../ui/ui.actions';

@Injectable()
export class ChatEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private socketService: SocketService
  ) {}

  selectedContactMessages = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpdateMessagesRest),
      switchMap((payload) => {
        return this.http
          .post(environment.api + '/contact/messages', {
            conversationId: payload.conversationId,
          })
          .pipe(
            mergeMap((response: any) => {
              let toast = new Toast(response);
              toast.show = true;
              if (response.status) {
                return [
                  UpdateMessages({
                    conversation: new Conversation(response.data),
                  }),
                ];
              }
              return [ShowToast({ toast: toast })];
            })
          );
      })
    );
  });

  updatingMessageStatus = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UpdateMessages),
        tap((payload) => {
          const socket = this.socketService.getSocket();
          payload.conversation.messages.forEach((message: IMessage) => {
            if (!message.read || !message.received) {
              socket.emit('message:receive', {
                conversation: payload.conversation.id,
                message: message,
              });
              socket.emit('message:read', {
                conversation: payload.conversation.id,
                message: message,
              });
            }
          });
        })
      );
    },
    { dispatch: false }
  );

  getContactUserDetails = createEffect(() => {
    return this.actions$.pipe(
      ofType(SelectContact),
      switchMap((payload) => {
        return this.http
          .post(environment.api + '/contact/userDetails', {
            userId: payload.contact.user,
          })
          .pipe(
            mergeMap((response: any) => {
              let toast = new Toast(response);
              toast.show = true;
              if (response.status) {
                const con = payload.contact.conversation + '';
                return [
                  UpdateContact({ contact: payload.contact }),
                  UpdateContactUser({ user: response.data }),
                  UpdateMessagesRest({ conversationId: con }),
                ];
              }
              return [ShowToast({ toast: toast })];
            })
          );
      })
    );
  });

  AddingContact = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddContactRest),
      switchMap((payload) => {
        return this.http
          .post(environment.api + '/contact/addContact', {
            userId: payload.userId,
            name: payload.name,
          })
          .pipe(
            mergeMap((response: any) => {
              let toast = new Toast(response);
              toast.show = true;
              if (response.status) {
                return [UpdateUser({ user: new User(response.data) })];
              }
              return [ShowToast({ toast: toast })];
            })
          );
      })
    );
  });

  EditContact = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditContactRest),
      switchMap((payload) => {
        return this.http
          .post(environment.api + '/contact/editContact', {
            userId: payload.userId,
            name: payload.name,
          })
          .pipe(
            mergeMap((response: any) => {
              let toast = new Toast(response);
              toast.show = true;
              if (response.status) {
                return [UpdateUser({ user: new User(response.data) })];
              }
              return [ShowToast({ toast: toast })];
            })
          );
      })
    );
  });

  DeleteContact = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeleteContactRest),
      switchMap((payload) => {
        return this.http
          .post(environment.api + '/contact/deleteContact', {
            userId: payload.userId,
            name: payload.name,
          })
          .pipe(
            mergeMap((response: any) => {
              let toast = new Toast(response);
              toast.show = true;
              if (response.status) {
                return [UpdateUser({ user: new User(response.data) })];
              }
              return [ShowToast({ toast: toast })];
            })
          );
      })
    );
  });

  SendingMessageRest = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SendMessageRest),
        tap((payload) => {
          const socket = this.socketService.getSocket();
          const { conversationId, message } = payload;
          socket.emit('message:send', {
            conversationId: conversationId,
            message: message,
          });
        })
      );
    },
    { dispatch: false }
  );
}
