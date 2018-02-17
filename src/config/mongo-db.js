import * as mongoose from 'mongoose';
import { mongo } from './config';
import logFactory from '../utility/log-factory';

const log = logFactory('mongo-db');
const { uri, poolSize } = mongo;

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
