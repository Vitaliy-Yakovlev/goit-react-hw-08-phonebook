import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  registerUserRequest,
  registerUserSuccess,
  registerUserError,
  logInUserRequest,
  logInUserSuccess,
  logInUserError,
  logOutUserRequest,
  logOutUserSuccess,
  logOutUserError,
  fetchCurrentUserRequest,
  fetchCurrentUserSuccess,
  fetchCurrentUserError,
} from './auth-actions';

const userReducer = createReducer(
  { name: null, email: null },
  {
    [registerUserSuccess]: (_, { payload }) => payload.user,
    [logInUserSuccess]: (_, { payload }) => payload.user,
    [fetchCurrentUserSuccess]: (_, { payload }) => payload,
    [logOutUserSuccess]: (_, { payload }) =>
      (payload = { name: null, email: null }),
  },
);

const tokenReducer = createReducer(null, {
  [registerUserSuccess]: (_, { payload }) => payload.token,
  [logInUserSuccess]: (_, { payload }) => payload.token,
  [logOutUserSuccess]: () => null,
});

const isLoggedInReducer = createReducer(false, {
  [registerUserSuccess]: () => true,
  [logInUserSuccess]: () => true,
  [fetchCurrentUserSuccess]: () => true,
  [logOutUserSuccess]: () => false,
});

const isFetchingCurrentUserReducer = createReducer(false, {
  [fetchCurrentUserRequest]: () => true,
  [fetchCurrentUserError]: () => false,
  [fetchCurrentUserSuccess]: () => false,
});

const errorReducer = createReducer(null, {
  [registerUserError]: () => {
    toast.error('Не верный ввод', { autoClose: 3000 });
  },
  [registerUserRequest]: () => null,
  [logInUserError]: () => {
    toast.error('Не верный email или пароль', { autoClose: 3000 });
  },
  [logInUserRequest]: () => null,
  [logOutUserError]: (_, { payload }) => payload,
  [logOutUserRequest]: () => null,
  [fetchCurrentUserError]: (_, { payload }) => payload,
  [fetchCurrentUserRequest]: () => null,
});

export const authReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  isLoggedIn: isLoggedInReducer,
  isFetchingCurrentUser: isFetchingCurrentUserReducer,
  error: errorReducer,
});
