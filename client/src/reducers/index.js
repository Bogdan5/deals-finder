import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import usageReducers from './usageReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  visibility: usageReducers,
});
