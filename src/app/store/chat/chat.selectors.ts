import { AppState } from 'src/app/store/app.store';
import { createSelector } from '@ngrx/store';
import { IContact } from 'src/app/Models/Contact';
import { IConversation } from 'src/app/Models/Conversation';
import { ChatState } from '../states';

export const chatSelector = (state: AppState) => state.chat;

export const contactSelector = createSelector(
  chatSelector,
  (state: ChatState) => state.contact
);

export const ConversationSelector = createSelector(
  chatSelector,
  (state: ChatState) => state.conversation
);

export const messageSelector = createSelector(
  ConversationSelector,
  (state: IConversation) => state.messages
);
