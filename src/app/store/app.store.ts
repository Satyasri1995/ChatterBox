
import { UIReducer } from './ui/ui.reducer';

import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer } from './auth/auth.reducer';
import { AuthState, UIState } from './states';

export interface AppState {
  auth: AuthState;
  ui: UIState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  auth: AuthReducer,
  ui: UIReducer,
};
