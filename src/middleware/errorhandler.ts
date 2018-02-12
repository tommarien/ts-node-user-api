import { Request, Response, NextFunction } from 'express';
import { boomify } from 'boom';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next();

  const error = boomify(err);

  return res.set(error.output.headers)
    .status(error.output.statusCode)
    .send(error.output.payload);
};
