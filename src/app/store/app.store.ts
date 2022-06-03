import { ChatReducer } from './chat/chat.reducer';

import { UIReducer } from './ui/ui.reducer';

import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer } from './auth/auth.reducer';
import { AuthState, UIState, ChatState } from './states';

export interface AppState {
  auth: AuthState;
  chat:ChatState;
  ui: UIState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  auth: AuthReducer,
  ui: UIReducer,
  chat:ChatReducer
};
