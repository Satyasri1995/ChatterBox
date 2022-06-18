import { IUser } from './../../Models/User';
import { IMessage } from './../../Models/Message';
import { IConversation } from './../../Models/Conversation';
import { IContact } from './../../Models/Contact';
import { createAction, props } from '@ngrx/store';

export const SelectContact = createAction(
  '[Contacts] Selecting the contact',
  props<{ contact: IContact }>()
);

export const UpdateContact = createAction(
  '[Contacts] Updating the contact',
  props<{ contact: IContact }>()
);

export const UpdateContactUser = createAction(
  "[Update Contact User] fetching user details of a contact",
  props<{user:IUser}>()
)

export const UpdateMessagesRest = createAction(
  '[Messages] loading the selected contact messages',
  props<{ conversationId: string }>()
);

export const UpdateMessages = createAction(
  '[Messages] loading the selected contact messages into state',
  props<{ conversation: IConversation }>()
);

export const UpdateMessage = createAction(
  '[Messages] Updating specific message in conversation',
  props<{ message: IMessage }>()
);

export const SendMessageRest = createAction(
  '[Sending Message] Sending the message to tthe other user',
  props<{ conversationId: string; message: IMessage }>()
);

export const AddContactRest = createAction(
  `[Adding Contact] Adding the selected contact to the contact list`,
  props<{userId:string,name:string}>()
);
