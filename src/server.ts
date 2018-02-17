import app from './app';
import * as config from './config/config';
import logFactory from './utility/log-factory';
import mongoDb from './config/mongo-db';

const log = logFactory('server');
const { runtime: { port, env, exitDelay } } = config;

log.debug('Awaiting mongo connection');
mongoDb()
  .then((mongoose) => {
    const server = app.listen(port, () => {
      log.info('Started', { port, env });
      log.debug('Press CTRL-C to stop');

      /*
      * Heroku is sending a SIGTERM when an application is restarted or a downscale event happened
      * We want to make sure that we don't kill the process as a result of that.
      * After 30s heroku will send a SIGKILL, which will terminate the process.
      */
      process.on('SIGTERM', () => {
        log.debug('Stopping server due to SIGTERM signal');
        // This makes sure no new request come in.
        server.close(() => {
          log.info('Stopped listening, awaiting delay or CTRL-C', { exitDelay });

          setTimeout(
            () => {
              process.exit(0);
            },
            exitDelay,
          );
        });
      });
    });
  });
