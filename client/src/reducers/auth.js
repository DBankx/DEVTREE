import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT,
  UPDATE_FOLLOW,
  FOLLOW_ERROR
} from '../actions/index';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: {}
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN:
      // set the token in the local storage to the payload
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        user: null
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case DELETE_ACCOUNT:
      // remove the item from the local storage
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    // set the user to the payload
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };

    case UPDATE_FOLLOW:
      return {
        ...state,
        loading: false,
        user: { ...state.user, following: payload }
      };

    case FOLLOW_ERROR:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default auth;
