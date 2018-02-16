import { createLogger } from 'bunyan';

export default (name: string) => {
  return createLogger({
    name,
  });
};
