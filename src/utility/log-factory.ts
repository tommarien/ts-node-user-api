import { createLogger, stdSerializers, TRACE } from 'bunyan';
import { debug } from 'util';

export default (name: string) => {
  return createLogger({
    name,
    level: TRACE,
    serializers: stdSerializers,
  });
};
