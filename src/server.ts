import app from './app';
import * as config from './config/config';
import logFactory from './utility/log-factory';

const log = logFactory('server');
const { runtime: { port, env } } = config;

const server = app.listen(port, () => {
  log.info(`Server is listening at http://localhost:${port} in ${env} mode`);
  log.info('Press CTRL-C to stop');
});

export = server;
