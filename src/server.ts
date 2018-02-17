import app from './app';
import * as config from './config/config';
import logFactory from './utility/log-factory';
import mongoDb from './config/mongo-db';

const log = logFactory('server');
const { runtime: { port, env } } = config;

log.info('Awaiting mongo connection');
mongoDb()
  .then(() => {
    log.info('Connected to MongoDb');
    const server = app.listen(port, () => {
      log.info(`Server is listening at http://localhost:${port} in ${env} mode`);
      log.info('Press CTRL-C to stop');
    });
  });
