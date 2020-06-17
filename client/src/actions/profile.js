import { GET_PROFILE, PROFILE_ERROR } from './index';
import axios from 'axios';
import { setAlert } from './alert';

// get current users profile
export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('Server Error', 'error'));
  }
};

// update or create profile
export const updateProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    if (!edit) {
      history.push('/dashboard');
    }

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'error')));
    }

    dispatch({
      type: PROFILE_ERROR
    });
  }
};
