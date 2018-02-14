module.exports = {
  runtime: {
    port: process.env.PORT || '3000',
    env: process.env.NODE_ENV || 'development',
  },
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb: //localhost/ts-user-api',
  },
};
