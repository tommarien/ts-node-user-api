import { createLogger, stdSerializers } from 'bunyan';

export default (name: string) => {
  return createLogger({
    name,
    serializers: stdSerializers,
  });
};
