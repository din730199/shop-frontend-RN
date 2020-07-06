import {ADD_TO_CART, REMOVE_FROM_CART, Incr_Quantity, Decr_Quantity} from '../types';

export default function(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      const isExist = state.some(e => e.product._id === action.payload._id);
      if (isExist) {
        return state.map(e => {
          if (e.product._id === action.payload._id)
           return { product: e.product, quantity: e.quantity + 1 }
           return e
      })
      }
      return [
        ...state,
          {
            product:action.payload,
            quantity:1
          }
        ]
    case REMOVE_FROM_CART:
      return state.filter((item, i) => item.product._id !== action.payload)

    case Incr_Quantity:
      return state.map(e => {
          if (e.product._id === action.payload.product._id)
           return { product: e.product, quantity: e.quantity + 1 }
           return e
      })
    
    case Decr_Quantity:
      return state.map(e => {
        if (e.product._id === action.payload.product._id)
           return { product: e.product, quantity: e.quantity - 1 }
           return e
      })
    default:
      return state;
  }
}
