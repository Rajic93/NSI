// Import Actions
import { ADD_ACCOUNT, ADD_POST, UPDATE_CONTENT, updateContent } from './AppActions';

// Initial State
const initialState = {
  posts: [],
  accounts: []
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      let updatedAccounts = state.accounts.concat(action.payload);
      return {
        accounts: updatedAccounts
      }
    case ADD_POST:
      let updatedPosts = state.posts.concat(action.payload);
      return {
        posts: updatedPosts
      }
    case UPDATE_CONTENT:
      return {
        posts: JSON.parse(JSON.stringify(action.payload)),
        accounts: JSON.parse(JSON.stringify(state.accounts))
      }
      return {
        posts: updatedContent
      }
    default:
      return state;
  }
};

/* Selectors */

// Get posts
export const getPosts = state => state.app.posts;
// Get accounts
export const getAccounts = state => state.app.accounts;

// Export Reducer
export default AppReducer;
