import app from './app';
import * as config from './config/config';

const port = config.runtime.port;

const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop\n');
});

export = server;
