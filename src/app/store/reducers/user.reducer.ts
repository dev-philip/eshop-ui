import { createReducer, on } from '@ngrx/store';
import { setUser } from '../actions/user.action';

export interface UserState {
  user: any | null;
}

export const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user }))
);
