// Export Constants
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const ADD_POST = 'ADD_POST';
export const UPDATE_CONTENT = 'UPDATE_CONTENT';

// Export Actions
export function addAccount(account) {
  return {
    type: ADD_ACCOUNT,
    payload: account
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    payload: post
  };
}

export function updateContent(content) {
  return {
    type: UPDATE_CONTENT,
    payload: content
  };
}