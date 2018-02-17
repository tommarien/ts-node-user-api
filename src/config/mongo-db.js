import * as mongoose from 'mongoose';
import * as config from './config';
import logFactory from '../utility/log-factory';

const log = logFactory('mongo-db');
config.mongo.poolSize
const { mongo: { uri, poolSize } } = config;

const connect = () => {
  // Setup error listener
  mongoose.connection.on('error', err => {
    log.error({ err });
  });

  log.debug('Connecting', { uri, poolSize });
  return mongoose.connect(uri, { poolSize: poolSize })
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
