import { Conversation } from './../../Models/Conversation';
import { environment } from 'src/environments/environment';
import { switchMap, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { UpdateMessages, UpdateMessagesRest } from './chat.actions';

@Injectable()
export class ChatEffects{
  constructor(private actions$:Actions,private http:HttpClient){}

  selectedContactMessages = createEffect(()=>{
    return this.actions$.pipe(
      ofType(UpdateMessagesRest),
      switchMap((payload)=>{
        return this.http.post(
          environment.api+"/chat/messages",
          {
            id:payload.id
          }
        ).pipe(mergeMap((response:any)=>{
          return [
            UpdateMessages({conversation:new Conversation(response.data)})
          ]
        }))
      })
    )
  });


}
