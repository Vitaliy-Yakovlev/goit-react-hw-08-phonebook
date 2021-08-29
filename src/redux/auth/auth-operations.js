import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    // TODO: Добавить обработку ошибки error.message
  }
});

const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    // TODO: Добавить обработку ошибки error.message
  }
});

const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {
    // TODO: Добавить обработку ошибки error.message
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      // TODO: Добавить обработку ошибки error.message
    }
  },
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default operations;

// import {
//   registerUserRequest,
//   registerUserSuccess,
//   registerUserError,
//   logInUserRequest,
//   logInUserSuccess,
//   logInUserError,
//   logOutUserRequest,
//   logOutUserSuccess,
//   logOutUserError,
//   fetchCurrentUserRequest,
//   fetchCurrentUserSuccess,
//   fetchCurrentUserError,
// } from './auth-actions';

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

// export const registerUser = () => async dispatch => {
//   dispatch(registerUserRequest());

//   axios
//     .post('/users/login')
//     .then(({ data }) => dispatch(registerUserSuccess(data)))
//     .then(({ data }) => token.set(data.token))
//     .catch(error => dispatch(registerUserError(error.message)));
// };

// export const logInUser = () => async dispatch => {
//   dispatch(logInUserRequest());

//   axios
//     .post('/users/login')
//     .then(({ data }) => dispatch(logInUserSuccess(data)))
//     .then(({ data }) => token.set(data.token))
//     .catch(error => dispatch(logInUserError(error.message)));
// };

// export const logOutInUser = () => async dispatch => {
//   dispatch(logOutUserRequest());

//   axios
//     .post('/users/login')
//     .then(({ data }) => dispatch(logOutUserSuccess(data)))
//     .then(({ data }) => token.set(data.token))
//     .catch(error => dispatch(logOutUserError(error.message)));
// };

// export const fetchCurrentUser = () => async dispatch => {
//   dispatch(fetchCurrentUserRequest());

//   axios
//     .get('/users/current')
//     .then(({ data }) => dispatch(fetchCurrentUserSuccess(data)))
//     .catch(error => dispatch(fetchCurrentUserError(error.message)));
// };
