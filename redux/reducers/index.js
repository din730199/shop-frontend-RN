import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

const allReducer = combineReducers({
    cartReducer
});

export default allReducer;