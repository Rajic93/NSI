import axios from 'axios';

export function initFacebookSdk(appId) {
    return new Promise((resolve, reject) => {
        window.fbAsyncInit = function () {
            FB.init({
                appId: appId,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.11'
            });

            resolve();
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    })

}

export function getShortLivedTokenFromFb(permissionsList) {
    return new Promise((resolve, reject) => {
        FB.login(function (response) {
            if (response.authResponse) {
                var accessToken = FB.getAuthResponse()['accessToken'];
                resolve(accessToken);
            } else {
                let errMsg = 'User cancelled login or did not fully authorize.';
                reject(errMsg);
            }
        }, { scope: permissionsList });
    })
};

export function getSavedLongLivedToken() {
    return axios.post('http://localhost:10000/fb/token')
        .then((response) => {
            console.log(response);
            if (response.status != 200) {
                return Promise.reject(response.statusText);
            }
            return response.data;
        });
};

export function getLongLivedToken(shortLivedAccessToken) {
    return axios.post('http://localhost:10000/fb/login', { userShortLivedToken: shortLivedAccessToken })
        .then((response) => {
            if (response.status != 200) {
                return Promise.reject(data.statusText);
            }

            return response.data.access_token;
        });
};

export function getFacebookPosts(token) {
    return new Promise((resolve, reject) => {
        FB.api(
            "/me/feed",
            function (response) {
                if (response && !response.error) {
                    resolve(response.data);
                } else {
                    reject(response);
                }
            }, {
                access_token: token,
                fields: "id,message,created_time,type,object_id,from"
            }
        );
    });
}

export function loadPostPicture(post, token) {
    return new Promise((resolve, reject) => {
        const photoId = post.object_id;

        if (post.type != "photo") {
            resolve(post);
        }

        FB.api(
            "/" + photoId,
            function (response) {
                if (response && !response.error) {
                    post.images = response.images;
                    resolve(post);
                } else {
                    reject(response);
                }
            }, {
                access_token: token,
                fields: "images"
            }
        );
    });
}


export function getPostAutohorImage(post, token) {
    return new Promise((resolve, reject) => {
        const postAuthorId = post.from.id;

        FB.api(
            "/" + postAuthorId,
            function (response) {
                if (response && !response.error) {
                    post.authorPicture = response.picture.data;
                    resolve(post);
                } else {
                    reject(response);
                }
            }, {
                access_token: token,
                fields: "id,name,picture"
            }
        );
    });

}



export function getWrappedFacebookFeed(token) {
    return getFacebookPosts(token)
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
            console.log(wrappedPosts);
            return Promise.resolve(wrappedPosts);
        }).catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });;


}

