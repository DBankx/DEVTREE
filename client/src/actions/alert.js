import { SET_ALERT, REMOVE_ALERT } from './index';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (message, alertType) => (dispatch) => {
  const id = uuidv4();

  dispatch({
    type: SET_ALERT,
    payload: { message, alertType, id }
  });

  // disptach remove alert after some time
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, 4000);
};
