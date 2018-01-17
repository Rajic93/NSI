import config from "../config";
import axios from 'axios';
import querystring from 'querystring';

const _INSTA_URL_ = `https://api.instagram.com/oauth/authorize/?client_id=${config.insta_client_id}`+
                    `&redirect_uri=${config.insta_redirect_uri}&response_type=code` +
                    `&scope=public_content+follower_list+comments+relationships+likes`;

export function redirect(res) {
    res.redirect(_INSTA_URL_);
}

export function authenticate(code, callback) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post('https://api.instagram.com/oauth/access_token', querystring.stringify({
        grant_type: 'authorization_code',
        client_id: config.insta_client_id,
        client_secret: config.insta_client_secret,
        redirect_uri: config.insta_redirect_uri,
        code: code
    }))
    .then((response) => {
        callback(response.data);
    }).catch((err) => {
        callback(err)
    });
};

export function feed(access_token, callback) {
    let url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${access_token}`;
    console.log(url);
    axios.get(url)
    .then((data) => {
        console.log("response data");
        console.log(data);
        callback(JSON.stringify(data));
    })
    .catch((error) => {
        callback(error);
    });
}