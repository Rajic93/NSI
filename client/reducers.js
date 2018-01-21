/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import intl from './modules/Intl/IntlReducer';
import facebook from './modules/Facebook/FacebookReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  intl,
  facebook
});
