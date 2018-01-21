import { getShortLivedTokenFromFb, getLongLivedToken, initFacebookSdk, getFacebookPosts, loadPostPicture } from "./FacebookAPI";

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
export const GET_SAVED_TOKEN_SUCCESS = 'GET_SAVED_TOKEN_REQUEST';
export const GET_SAVED_TOKEN_FAILURE = 'GET_SAVED_TOKEN_REQUEST';

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
                    loadingPostImage = loadPostPicture(post);
                    loadingPostsImages.push(loadingPostImage);
                });
                return Promise.all(loadingPostsImages);
            }).then((postsWithImages) => {
                alert("loadedPIcs");
                dispatch(receivedFacebookFeed(postsWithImages));
                console.log(postsWithImages);
            }).catch((err) => {
                console.log(err);
            });;
    }
}

