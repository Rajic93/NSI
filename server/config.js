const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://admin:socialMixerAdmin#192837465@ds161346.mlab.com:61346/socia_mixer',
  port: process.env.PORT || 10000,
  fb_app_id: '161075037850261',
  fb_app_secret:'81e9c5c933342160f2bd09c4b5c06953',
  insta_client_id: '66594bf083db48df8657c7aa53f15207',
  insta_client_secret: '9daf5cf30a744da2832d3679bfb4669a',
  insta_redirect_uri: 'http://localhost:10000/inst/inst_redirect'
};

export default config;