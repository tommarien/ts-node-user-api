import * as mongoose from 'mongoose';
import * as config from './config';
import logFactory from '../utility/log-factory';

const log = logFactory('mongo-db');
const { mongo: { uri } } = config;

const connect = () => {
  // Setup error listener
  mongoose.connection.on('error', err => {
    log.error({ err });
  });

  log.info('Connecting to mongo', { uri });
  return mongoose.connect(uri)
    .catch(()=> {
      log.fatal('Mongo connection failed to initialize')
      process.exit(1);
    });
}

export default connect
