/* tslint:disable */
const { tryParseInt } = require('../utility/try-parse');

module.exports = {
  mongo: {
    poolSize: tryParseInt(process.env.MONGO_POOLSIZE, 5),
    uri: process.env.MONGO_URI || 'mongodb://localhost/ts-api',
  },
  runtime: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '3000',
  },
};
