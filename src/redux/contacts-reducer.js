import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  getContactsRequest,
  getContactsSuccess,
  getContactsError,
  addContactsRequest,
  addContactsSuccess,
  addContactsError,
  deleteContactsRequest,
  deleteContactsSuccess,
  deleteContactsError,
  filterContact,
} from './contacts-actions';

const itemReducer = createReducer([], {
  [getContactsSuccess]: (_, { payload }) => payload,
  [addContactsSuccess]: (state, { payload }) => {
    return [...state, payload];
  },
  [deleteContactsSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const loadingReducer = createReducer(false, {
  [getContactsRequest]: () => true,
  [getContactsSuccess]: () => false,
  [getContactsError]: () => false,
  [addContactsRequest]: () => true,
  [addContactsSuccess]: () => false,
  [addContactsError]: () => false,
  [deleteContactsRequest]: () => true,
  [deleteContactsSuccess]: () => false,
  [deleteContactsError]: () => false,
});

const filterReducer = createReducer('', {
  [filterContact]: (_, { payload }) => payload,
});

const errorReducer = createReducer(null, {
  [getContactsError]: (_, { payload }) => payload,
  [getContactsSuccess]: () => null,
  [addContactsError]: (_, { payload }) => payload,
  [addContactsRequest]: () => null,
  [deleteContactsError]: (_, { payload }) => payload,
  [deleteContactsRequest]: () => null,
});

const contactsReducer = combineReducers({
  items: itemReducer,
  filter: filterReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default contactsReducer;
