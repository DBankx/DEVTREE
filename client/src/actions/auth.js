import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN,
  LOGOUT,
  LOGIN_FAIL,
  LOAD_USER,
  AUTH_ERROR
} from './index';
import axios from 'axios';
import { setAlert } from './alert';
import setToken from '../helpers/setToken';

// get the user data
export const loadUser = () => async (dispatch) => {
  // set the header to the token
  if (localStorage.token) {
    setToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: LOAD_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// register a user
export const registerUser = ({
  name,
  email,
  username,
  password,
  dateofbirth
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password, username, dateofbirth });

  try {
    const res = await axios.post('/api/user', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    //   get the errors from the backend
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'error')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// login a user

export const login = ({ username, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN,
      payload: res.data
    });

    // load the user
    dispatch(loadUser());
  } catch (err) {
    //   get the errors from the backend
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'error')));
    }

    dispatch({
      type: LOGIN_FAIL
    });

    dispatch(setAlert('Login Error', 'error'));
  }
};

// logout user

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT
  });
};
