import { NextFunction, Request, Response } from 'express';
import { resourceNotFound } from '../utility/errors';

const OBJECTID_REGEX = new RegExp('^[0-9a-fA-F]{24}$');

const verifyParamIsObjectId = (paramName: string, resourceName: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const id = `${req.params[paramName]}`;
    if (!OBJECTID_REGEX.test(id)) {
      return next(resourceNotFound(resourceName, id));
    }
    next();
  };

export default verifyParamIsObjectId;
