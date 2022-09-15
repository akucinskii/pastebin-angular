import { createReducer, on } from '@ngrx/store';
import { login, logout } from './user.actions';
import { User } from './user.model';

export const initialState: User = {
  isLoggedIn: false,
  name: '',
};

export const userReducer = createReducer(
  initialState,

  on(login, (entries, { name }) => {
    return { isLoggedIn: true, name: name };
  }),

  on(logout, (_) => ({ isLoggedIn: false, name: '' }))
);
