// Import Actions
import { REDIRECT } from './InstagramActions';

// Initial State
const initialState = {
  redirected: false,
  redirectPage: null
};

const InstagramReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDIRECT:
      redirected: true;
      redirectPage: action.payload
    default:
      return state;
  }
};

export default InstagramReducer;
