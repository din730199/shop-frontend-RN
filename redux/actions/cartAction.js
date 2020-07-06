import {ADD_TO_CART, REMOVE_FROM_CART, Incr_Quantity, Decr_Quantity} from '../types';
export const addToCart = product => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: product,
  });
};

export const removeItem = item => dispatch => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: item,
  });
};

export const incrQuantity = item => dispatch => {
  dispatch({
    type: Incr_Quantity,
    payload: item,
  });
};

export const decrQuantity = item => dispatch => {
  dispatch({
    type: Decr_Quantity,
    payload: item,
  });
};
