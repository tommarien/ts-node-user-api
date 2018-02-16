import { Request, Response, NextFunction } from 'express';
import { boomify } from 'boom';
import logFactory from '../utility/log-factory';

const log = logFactory('error-handler');

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next();

  const error = boomify(err);

  // every error that has no statuscode set will be seen as a 500 error so log these
  if (err.output.statusCode >= 500) log.error(err);

  return res.set(error.output.headers)
    .status(error.output.statusCode)
    .send(error.output.payload);
};
