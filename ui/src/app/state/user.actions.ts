import { createAction, props } from '@ngrx/store';

export const login = createAction('Login', props<{ name: string }>());

export const logout = createAction('Logout');
