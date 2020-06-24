import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN,
  LOGOUT,
  LOGIN_FAIL,
  LOAD_USER,
  AUTH_ERROR,
  CLEAR_PROFILE,
  UPDATE_FOLLOW,
  FOLLOW_ERROR,
  UNFOLLOW_USER
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
  }
};

// logout user

export const logout = (history) => (dispatch) => {
  dispatch({
    type: LOGOUT
  });

  history.push('/login');

  dispatch({
    type: CLEAR_PROFILE
  });
};

// follow a user
export const follow = (user_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/user/follow/${user_id}`);

    dispatch({ type: UPDATE_FOLLOW, payload: res.data });
  } catch (err) {
    dispatch({ type: FOLLOW_ERROR });
  }
};

// unfollow a user
export const unfollow = (user_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/user/unfollow/${user_id}`);

    dispatch({
      type: UPDATE_FOLLOW,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: FOLLOW_ERROR });
  }
};
