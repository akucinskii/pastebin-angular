import { createReducer, on } from '@ngrx/store';
import { login, logout } from './user.actions';
import { User } from './user.model';

export const initialState: User = {
  isLoggedIn: false,
};

export const userReducer = createReducer(
  initialState,

  on(login, (state, { name }) => ({ isLoggedIn: true, name })),

  on(logout, () => ({ isLoggedIn: false, name: undefined }))
);
