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
} from './chat.actions';
import { IMessage } from 'src/app/Models/Message';
import { User } from 'src/app/Models/User';

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
          .post(environment.api + '/chat/messages', {
            id: payload.id,
          })
          .pipe(
            mergeMap((response: any) => {
              return [
                UpdateMessages({
                  conversation: new Conversation(response.data),
                }),
              ];
            })
          );
      })
    );
  });

  getSelectedContactMessages = createEffect(() => {
    return this.actions$.pipe(
      ofType(SelectContact),
      switchMap((payload) => {
        return of(UpdateMessagesRest({ id: payload.contact.conversation.id }));
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

  AddingContact = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddContactRest),
      switchMap((payload) => {
        return this.http.post(environment.api + '/contact/addContact', {
          userId: payload.userId,
          name: payload.name,
        }).pipe(
          mergeMap((response:any)=>{
            return [
              UpdateUser({user:new User(response.data)})
            ]
          })
        );
      })
    );
  });
}
