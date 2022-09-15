import { User } from './user.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const userLoginStatus = createSelector(
  createFeatureSelector<User>('user'),
  (state: User) => {
    console.log(state);
    return !state.isLoggedIn;
  }
);
export const userSelector = createSelector(
  createFeatureSelector<User>('user'),
  (state: User) => {
    return state;
  }
);
