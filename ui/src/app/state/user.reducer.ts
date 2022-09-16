import { createReducer, on } from '@ngrx/store';
import jwtDecode from 'jwt-decode';
import { login, logout } from './user.actions';
import { User } from './user.model';

export const initialState: User = {
  isLoggedIn: false,
  name: '',
};

export const userReducer = createReducer(
  initialState,

  on(login, (entries) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return initialState;
    }

    const decodedToken: { name: string } = jwtDecode(token);

    return { isLoggedIn: true, name: decodedToken.name };
  }),

  on(logout, (_) => {
    localStorage.removeItem('token');
    return initialState;
  })
);
