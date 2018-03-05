import * as mongoose from 'mongoose';
import logFactory from '../utility/log-factory';
import { mongo } from './config';

const log = logFactory('mongo-db');
const { uri, poolSize } = mongo;

const connect = () => {
  // Setup error listener
  mongoose.connection.on('error', (err) => {
    log.error({ err });
  });

  log.debug('Connecting', { poolSize });
  return mongoose.connect(uri, { poolSize })
    .then((mongoosy) => {
      log.info('Connected');
      return mongoosy;
    })
    .catch(() => {
      log.fatal('Failed to connect');
      process.exit(1);
    });
};

export default connect;
