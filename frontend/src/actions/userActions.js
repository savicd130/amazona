import Axios from 'axios';
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SINGIN_FAIL,
  USER_SINGIN_REQUEST,
  USER_SINGIN_SUCCESS,
  USER_SINGOUT,
} from '../constants/userConstants';

export const register = (name, email, password) => async dispatch => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/users/register', {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SINGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signin = (email, password) => async dispatch => {
  dispatch({ type: USER_SINGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/users/signin', { email, password });
    dispatch({ type: USER_SINGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SINGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => dispatch => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_SINGOUT });
};
