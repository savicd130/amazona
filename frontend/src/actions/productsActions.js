import Axios from 'axios';
import {
  PRODUCTS_CREATE_FAIL,
  PRODUCTS_CREATE_REQUEST,
  PRODUCTS_CREATE_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
} from '../constants/productContasts';

export const listProducts = () => async dispatch => {
  dispatch({
    type: PRODUCTS_LIST_REQUEST,
  });

  try {
    const { data } = await Axios.get('/api/products');
    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCTS_LIST_FAIL, payload: err.message });
  }
};

export const detailsProduct = productId => async dispatch => {
  dispatch({ type: PRODUCTS_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCTS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCTS_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/products',
      {},
      {
        headers: {
          Authorization: userInfo.token,
        },
      }
    );
    dispatch({ type: PRODUCTS_CREATE_SUCCESS, payload: data.product });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCTS_CREATE_FAIL, payload: message });
  }
};
