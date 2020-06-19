import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_EDUCATION,
  DELETE_EXPERIENCE,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_PROFILE_BY_ID
} from '../actions/index';

const initialState = {
  profile: null,
  viewProfile: null,
  loading: true,
  profiles: [],
  repos: [],
  errors: {}
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
    case DELETE_EXPERIENCE:
    case DELETE_EDUCATION:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: null,
        loading: false
      };
    case GET_PROFILE_BY_ID:
      return {
        ...state,
        viewProfile: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default profile;
