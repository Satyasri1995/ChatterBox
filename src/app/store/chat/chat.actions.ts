import { IConversation } from './../../Models/Conversation';
import { IContact } from './../../Models/Contact';
import { createAction, props } from '@ngrx/store';


export const SelectContact = createAction(
  "[Contacts] Selecting the contact",
  props<{contact:IContact}>()
);

export const UpdateMessagesRest = createAction(
  "[Messages] loading the selected contact messages",
  props<{id:string}>()
)

export const UpdateMessages = createAction(
  "[Messages] loading the selected contact messages into state",
  props<{conversation:IConversation}>()
)
