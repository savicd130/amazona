import Axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_ADD_ITEM_FAIL,
} from '../constants/cartConstants';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    const {
      cart: { cartItems },
    } = getState();
    if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
      dispatch({
        type: CART_ADD_ITEM_FAIL,
        payload: "Can't Add to Cart. Buy from one seller at a time.",
      });
    } else {
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          product: data._id,
          seller: data.seller,
          qty,
        },
      });
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );
    }
  } catch (err) {}
};

export const removeFromCart = productId => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = data => dispatch => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = data => dispatch => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
