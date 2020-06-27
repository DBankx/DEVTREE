import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_EDUCATION,
  DELETE_EXPERIENCE,
  CLEAR_PROFILE,
  FIND_PROFILE,
  GET_PROFILES,
  GET_USER_POSTS,
  GET_LIKED_POSTS
} from '../actions/index';

const initialState = {
  profile: null,
  viewProfiles: [],
  loading: true,
  profiles: [],
  repos: [],
  posts: [],
  likedPosts: [],
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
    case GET_USER_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };

    case GET_LIKED_POSTS:
      return {
        ...state,
        likedPosts: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default profile;
