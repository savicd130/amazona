import Axios from 'axios';
import {
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
