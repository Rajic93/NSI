const config = {
  //mongoURL: process.env.MONGO_URL || 'mongodb://admin:socialMixerAdmin#192837465@ds161346.mlab.com:61346/socia_mixer',
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017',
  port: process.env.PORT || 10000,
  insta_client_id: '66594bf083db48df8657c7aa53f15207',
  insta_client_secret: '9daf5cf30a744da2832d3679bfb4669a',
  insta_redirect_uri: 'http://localhost:10000/inst/inst_redirect'
};

export default config;