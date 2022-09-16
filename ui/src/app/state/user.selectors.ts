import { User } from './user.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const userSelector = createSelector(
  createFeatureSelector<User>('user'),
  (state: User) => {
    return state;
  }
);
