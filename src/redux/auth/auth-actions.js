import { createAction } from '@reduxjs/toolkit';

export const registerUserRequest = createAction('registerUserRequest');
export const registerUserSuccess = createAction('registerUserSuccess');
export const registerUserError = createAction('registerUserError');

export const logInUserRequest = createAction('logInUserRequest');
export const logInUserSuccess = createAction('logInUserSuccess');
export const logInUserError = createAction('logInUserError');

export const logOutUserRequest = createAction('logOutUserRequest');
export const logOutUserSuccess = createAction('logOutSuccess');
export const logOutUserError = createAction('logOutError');

export const fetchCurrentUserRequest = createAction('fetchCurrentUserRequest');
export const fetchCurrentUserSuccess = createAction('fetchCurrentUserSuccess');
export const fetchCurrentUserError = createAction('fetchCurrentUserError');
