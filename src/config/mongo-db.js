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

  log.debug('Connecting', { uri });
  return mongoose.connect(uri)
    .then(mongoose => {
      log.info('Connected', { uri });
      return mongoose;
    })
    .catch(() => {
      log.fatal('Failed to connect')
      process.exit(1);
    });
}

export default connect
