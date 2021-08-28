import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contacts-reducer';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
