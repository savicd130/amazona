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
  PRODUCTS_UPDATE_REQUEST,
  PRODUCTS_UPDATE_SUCCESS,
  PRODUCTS_UPDATE_FAIL,
  PRODUCTS_DELETE_REQUEST,
  PRODUCTS_DELETE_SUCCESS,
  PRODUCTS_DELETE_FAIL,
  PRODUCTS_CATEGORY_LIST_REQUEST,
  PRODUCTS_CATEGORY_LIST_SUCCESS,
  PRODUCTS_CATEGORY_LIST_FAIL,
  PRODUCTS_REVIEW_CREATE_REQUEST,
  PRODUCTS_REVIEW_CREATE_SUCCESS,
  PRODUCTS_REVIEW_CREATE_FAIL,
} from '../constants/productContasts';

export const listProducts = ({
  seller = '',
  name = '',
  category = '',
  min = 0,
  max = 0,
  rating = 0,
  order = '',
}) => async dispatch => {
  dispatch({
    type: PRODUCTS_LIST_REQUEST,
  });

  try {
    const { data } = await Axios.get(
      `/api/products?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
    );

    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCTS_LIST_FAIL, payload: err.message });
  }
};

export const listProductsCategories = () => async dispatch => {
  dispatch({ type: PRODUCTS_CATEGORY_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`/api/products/categories`);
    dispatch({ type: PRODUCTS_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCTS_CATEGORY_LIST_FAIL, payload: err.message });
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

export const updateProduct = product => async (dispatch, getState) => {
  dispatch({ type: PRODUCTS_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/products/${product._id}`, product, {
      headers: {
        Authorization: userInfo.token,
      },
    });
    dispatch({ type: PRODUCTS_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCTS_UPDATE_FAIL, payload: message });
  }
};

export const deleteProduct = productId => async (dispatch, getState) => {
  dispatch({ type: PRODUCTS_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/products/${productId}`, {
      headers: {
        Authorization: userInfo.token,
      },
    });
    dispatch({ type: PRODUCTS_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCTS_DELETE_FAIL, payload: message });
  }
};

export const createReview = (productId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PRODUCTS_REVIEW_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/products/${productId}/reviews`,
      review,
      {
        headers: {
          Authorization: userInfo.token,
        },
      }
    );
    dispatch({ type: PRODUCTS_REVIEW_CREATE_SUCCESS, payload: data.review });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCTS_REVIEW_CREATE_FAIL, payload: message });
  }
};
