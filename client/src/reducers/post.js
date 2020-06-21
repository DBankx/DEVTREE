import {
  GET_POSTS,
  POST_ERROR,
  MAKE_POST,
  UPDATE_LIKES
} from '../actions/index';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {}
};

const post = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };

    case MAKE_POST:
      // add the new post into the front of the array
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    //   map through the posts state, and add the like or remove the like
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };

    default:
      return state;
  }
};

export default post;
