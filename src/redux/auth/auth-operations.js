import axios from 'axios';

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

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const registerUser = credentials => async dispatch => {
  dispatch(registerUserRequest());

  axios
    .post('/users/signup', credentials)
    .then(({ data }) => {
      token.set(data.token);
      return dispatch(registerUserSuccess(data));
    })
    .catch(error => dispatch(registerUserError(error.message)));
};

export const logInUser = credentials => async dispatch => {
  dispatch(logInUserRequest());

  axios
    .post('/users/login', credentials)
    .then(({ data }) => {
      token.set(data.token);
      dispatch(logInUserSuccess(data));
    })
    .catch(error => dispatch(logInUserError(error.message)));
};

export const logOutUser = () => async dispatch => {
  dispatch(logOutUserRequest());

  axios
    .post('/users/logout')
    .then(({ data }) => {
      token.unset();
      dispatch(logOutUserSuccess(data));
    })
    .catch(error => dispatch(logOutUserError(error.message)));
};

export const fetchCurrentUser = () => (dispatch, thunkAPI) => {
  const persistedToken = thunkAPI().auth.token;

  if (!persistedToken) {
    return;
  }
  token.set(persistedToken);

  dispatch(fetchCurrentUserRequest());

  axios
    .get('/users/current')
    .then(({ data }) => dispatch(fetchCurrentUserSuccess(data)))
    .catch(error => dispatch(fetchCurrentUserError(error.message)));
};
