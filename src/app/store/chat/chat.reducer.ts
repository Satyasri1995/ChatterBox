import { Message } from './../../Models/Message';
import { IContact } from './../../Models/Contact';
import { UpdateContact, UpdateMessage, UpdateMessages, UpdateContactUser } from './chat.actions';
import { createReducer, on } from '@ngrx/store';
import { Conversation, IConversation } from './../../Models/Conversation';
import { Contact } from "src/app/Models/Contact";


const initialState ={
  contact:<IContact>new Contact(),
  conversation:<IConversation>new Conversation()
}

export const ChatReducer = createReducer(
  initialState,
  on(UpdateMessages,(state,payload)=>{
    return {
      ...state,
      conversation:payload.conversation
    }
  }),
  on(UpdateContact,(state,payload)=>{
    return {
      ...state,
      contact:payload.contact
    }
  }),
  on(UpdateContactUser,(state,payload)=>{
    return {
      ...state,
      contact:{
        ...state.contact,
        user:payload.user
      }
    }
  }),
  on(UpdateMessage,(state,payload)=>{
    const messages = [...state.conversation.messages.map(msg=>new Message(msg))];
    const msgIdx = messages.findIndex((msg)=>msg.id===payload.message.id);
    if(msgIdx>=0){
      messages[msgIdx]=payload.message;
    }else{
      messages.push(new Message(payload.message));
    }
    return {
      ...state,
      conversation:{
        ...state.conversation,
        messages:messages
      }
    }
  })
)
