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

  if (log.debug()) {
    mongoose.set('debug', (coll: string, method: string, query: any, doc: any, options: any) => {
      const set = {
        coll,
        doc,
        method,
        options,
        query,
      };

      log.debug({ dbQuery: set });
    });
  }

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
