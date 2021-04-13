import {
  PRODUCTS_CREATE_FAIL,
  PRODUCTS_CREATE_REQUEST,
  PRODUCTS_CREATE_RESET,
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
  PRODUCTS_UPDATE_RESET,
  PRODUCTS_DELETE_REQUEST,
  PRODUCTS_DELETE_SUCCESS,
  PRODUCTS_DELETE_FAIL,
  PRODUCTS_DELETE_RESET,
  PRODUCTS_CATEGORY_LIST_REQUEST,
  PRODUCTS_CATEGORY_LIST_SUCCESS,
  PRODUCTS_CATEGORY_LIST_FAIL,
} from '../constants/productContasts';

export const productListReducer = (
  state = { loading: true, products: [] },
  actions
) => {
  switch (actions.type) {
    case PRODUCTS_LIST_REQUEST:
      return { loading: true };
    case PRODUCTS_LIST_SUCCESS:
      return { loading: false, products: actions.payload };
    case PRODUCTS_LIST_FAIL:
      return { loading: false, error: actions.payload };
    default:
      return state;
  }
};

export const productCategoryListReducer = (
  state = { loading: true, products: [] },
  actions
) => {
  switch (actions.type) {
    case PRODUCTS_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case PRODUCTS_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: actions.payload };
    case PRODUCTS_CATEGORY_LIST_FAIL:
      return { loading: false, error: actions.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCTS_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCTS_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCTS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_CREATE_REQUEST:
      return { loading: true };
    case PRODUCTS_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCTS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCTS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCTS_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCTS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCTS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_DELETE_REQUEST:
      return { loading: true };
    case PRODUCTS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCTS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCTS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
