// Import Actions
import { FB_SDK_READY, GET_NEW_TOKEN_SUCCESS } from './FacebookActions';

export const AccountState = {
  NOT_CONNECTED: 'NOT_CONNECTED',
  CONNECTED: 'CONNECTED',
  CHECKING: 'CHECKING'
};

// Initial State
const initialState = {
  isSdkReady: "NO",
  isTokenReady: false,
  message: "Fb sdk is not ready",
  longLivedToken: ""
};




const FacebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FB_SDK_READY:
      return Object.assign({}, state, {
        isSdkReady: "YES",
        message: "Facebook sdk is ready"
      })
    case GET_NEW_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        longLivedToken: action.token,
        isTokenReady: true
      })
    default:
      return state;
  }
};

export default FacebookReducer;
