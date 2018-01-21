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
            "/me/posts",
            function (response) {
                if (response && !response.error) {
                    resolve(response.data);
                } else {
                    reject(response);
                }
            }, {
                fields: "id,message,created_time,type,object_id,from"
            }
        );
    });
}

export function loadPostPicture(post) {
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
                fields: "images"
            }
        );
    });
}


export function getPostAutohorImage(post) {
    return new Promise((resolve, reject) => {
        const postAuthorId = post.from.id;

        FB.api(
            "/" + postAuthorId,
            function (response) {
                if (response && !response.error) {
                    console.log(response);
                    post.authorPicture = response.picture.data;
                    resolve(post);
                } else {
                    reject(response);
                }
            }, {
                fields: "id,name,picture"
            }
        );
    });

}