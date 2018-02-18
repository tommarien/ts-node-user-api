import { createLogger, stdSerializers, TRACE } from 'bunyan';
import { debug } from 'util';

export default (name: string) => {
  return createLogger({
    name,
    // tslint:disable-next-line:object-literal-sort-keys
    level: TRACE,
    serializers: stdSerializers,
  });
};
