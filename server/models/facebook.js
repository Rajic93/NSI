import config from '../config';
import axios from 'axios';
import querystring from 'querystring';

export function generateUserLongLivedToken(shortLivedToken, callback) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post('https://graph.facebook.com/oauth/access_token', querystring.stringify({
        grant_type: "fb_exchange_token",
        client_id: config.fb_app_id,
        client_secret: config.fb_app_secret,
        fb_exchange_token: shortLivedToken
    }))
    .then((response) => {
        callback(response.data);
    }).catch((err) => {
        callback(err)
    });
};

