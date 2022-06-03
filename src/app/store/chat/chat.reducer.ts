import { IContact } from './../../Models/Contact';
import { SelectContact, UpdateMessages } from './chat.actions';
import { createReducer, on } from '@ngrx/store';
import { Conversation, IConversation } from './../../Models/Conversation';
import { Contact } from "src/app/Models/Contact";


const initialState ={
  contact:<IContact>new Contact(),
  conversation:<IConversation>new Conversation()
}

export const ChatReducer = createReducer(
  initialState,
  on(SelectContact,(state,payload)=>{
    return {
      ...state,
      contact:payload.contact
    }
  }),
  on(UpdateMessages,(state,payload)=>{
    return {
      ...state,
      conversation:payload.conversation
    }
  })
)
