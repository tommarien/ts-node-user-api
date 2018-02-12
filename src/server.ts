import app from './app';

const port = app.get('port');

const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop\n');
});

export = server;
