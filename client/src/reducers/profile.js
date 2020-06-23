import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_EDUCATION,
  DELETE_EXPERIENCE,
  CLEAR_PROFILE,
  FIND_PROFILE,
  GET_PROFILES
} from '../actions/index';

const initialState = {
  profile: null,
  viewProfiles: [],
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
    case FIND_PROFILE:
      return {
        ...state,
        viewProfiles: payload,
        loading: null
      };

    default:
      return state;
  }
};

export default profile;
