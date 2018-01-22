import { getShortLivedTokenFromFb, getLongLivedToken, initFacebookSdk, getFacebookPosts, loadPostPicture, getPostAutohorImage, getSavedLongLivedToken } from "./FacebookAPI";

// Export Constants

/**
 * Get a new token from facebook server.
 */
export const GET_NEW_TOKEN_REQUEST = 'GET_NEW_TOKEN_REQUEST';
export const GET_NEW_TOKEN_SUCCESS = 'GET_NEW_TOKEN_SUCCESS';
export const GET_NEW_TOKEN_FAILURE = 'GET_NEW_TOKEN_FAILURE';

/**
 * Get saved token from our server.
 */
export const GET_SAVED_TOKEN_REQUEST = 'GET_SAVED_TOKEN_REQUEST';
export const GET_SAVED_TOKEN_SUCCESS = 'GET_SAVED_TOKEN_SUCCESS';
export const GET_SAVED_TOKEN_FAILURE = 'GET_SAVED_TOKEN_FAILURE';

/**
 * Validate token cause it can expire.
 */
export const VALIDATE_TOKEN_REQUEST = 'VALIDATE_TOKEN_REQUEST';
export const VALIDATE_TOKEN_SUCCESS = 'VALIDATE_TOKEN_SUCCESS';
export const VALIDATE_TOKEN_FAILURE = 'VALIDATE_TOKEN_FAILURE';

export const RECEIVED_FB_FEED = 'RECEIVED_FB_FEED';


export const FB_SDK_READY = "FB_SDK_READY";


// Export Actions
export function fbSdkReady() {
    return { type: FB_SDK_READY };
}

//Get new token
export function getNewTokenRequest() {
    return { type: GET_NEW_TOKEN_REQUEST };
}

export function getNewTokenSuccess(token) {
    return {
        type: GET_NEW_TOKEN_SUCCESS,
        token: token
    };
}

export function getNewTokenFailure(errorMessage) {
    return {
        type: GET_NEW_TOKEN_FAILURE,
        errorMessage: errorMessage
    };
}

//Get saved token
export function getSavedTokenRequest() {
    return { type: GET_SAVED_TOKEN_REQUEST };
}

export function getSavedTokenSuccess(token) {
    return {
        type: GET_SAVED_TOKEN_SUCCESS,
        token: token
    };
}

export function getSavedTokenFailure(errorMessage) {
    return {
        type: GET_SAVED_TOKEN_FAILURE,
        errorMessage: errorMessage
    };
}

export function receivedFacebookFeed(posts) {
    return {
        type: RECEIVED_FB_FEED,
        posts: posts
    }
}


// Async actions

export function initFbSdk() {
    return function (dispatch) {
        return initFacebookSdk('161075037850261')
            .then(() => {
                dispatch(fbSdkReady());
            });
    };
}



export function getSavedToken() {
    return function (dispatch) {
        return getSavedLongLivedToken()
            .then((token) => {
                dispatch(getSavedTokenSuccess(token));
            }).catch((err) => {
                console.log(err);
            });
    };
}



export function getShortLivedToken(permissionsList) {
    return function (dispatch) {
        dispatch(getNewTokenRequest());
        return getShortLivedTokenFromFb(permissionsList)
            .then((token) => {
                dispatch(getNewTokenSuccess(token));
            }).catch((msg) => {
                dispatch(getNewTokenFailure(msg));
            });
    };
}

export function generateLongLivedToken(permissionsList) {
    return function (dispatch) {
        dispatch(getNewTokenRequest());

        getShortLivedTokenFromFb(permissionsList)
            .then((shortLivedToken) => {
                return getLongLivedToken(shortLivedToken);
            }).then((longLivedToken) => {
                dispatch(getNewTokenSuccess(longLivedToken));
            }).catch((msg) => {
                dispatch(getNewTokenFailure(msg));
            });
    };
}

export function getFeed(token) {
    return function (dispatch) {
        getFacebookPosts(token)
            .then((posts) => {
                let loadingPostsImages = [];
                let loadingPostImage;
                posts.forEach(post => {
                    loadingPostImage = loadPostPicture(post, token);
                    loadingPostsImages.push(loadingPostImage);
                });
                return Promise.all(loadingPostsImages);
            }).then((posts) => {
                let loadingPostsAuthorImages = [];
                let authorImage;
                posts.forEach(post => {
                    authorImage = getPostAutohorImage(post, token);
                    loadingPostsAuthorImages.push(authorImage);
                });
                return Promise.all(loadingPostsAuthorImages);
            }).then((postsWithImages) => {
                let wrappedPosts = [];
                postsWithImages.forEach(post => {
                    wrappedPosts.push({ type: 'facebook', data: post });
                });
                dispatch(receivedFacebookFeed(postsWithImages));
                console.log(wrappedPosts);
            }).catch((err) => {
                console.log(err);
            });;
    }
}


export function initializeFacebook(permissionsList) {
    return function (dispatch) {
        return initFacebookSdk('161075037850261')
            .then(() => {
                dispatch(getNewTokenRequest());
                return getShortLivedTokenFromFb(permissionsList);
            }).then((token) => {
                dispatch(getNewTokenSuccess(token));
                return Promise.resolve(token);
            }).catch((msg) => {
                dispatch(getNewTokenFailure(msg));
                return Promise.reject(msg);
            });;

    };
}