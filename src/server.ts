import app from './app';
import { runtime } from './config/config';
import mongoDb from './config/mongo-db';
import logFactory from './utility/log-factory';

const log = logFactory('server');
const { port, env } = runtime;

log.debug('Awaiting mongo connection');
mongoDb()
  .then((mongoose) => {
    const server = app.listen(port, () => {
      log.info('Started', { port, env });
      log.debug('Press CTRL-C to stop');

      const handleSignal = (signal: string) => {
        log.info(`Stopping server due to ${signal} signal`);
        // This makes sure no new request come in.
        server.close(() => {
          process.exit(0);
        });
      };

      /*
      * Heroku is sending a SIGTERM when an application is restarted or a downscale event happened
      * We want to make sure that we don't kill the process as a result of that.
      * After 30s heroku will send a SIGKILL, which will terminate the process.
      */
      process.on('SIGTERM', () => handleSignal('SIGTERM'));
    });
  });
