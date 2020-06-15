import { GET_PROFILE, PROFILE_ERROR } from '../actions/index';

const initialState = {
  profile: null,
  loading: true,
  profiles: [],
  repos: [],
  errors: {}
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
        profile: null
      };
    default:
      return state;
  }
};

export default profile;
