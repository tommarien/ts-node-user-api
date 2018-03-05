import { badRequest } from 'boom';
import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export enum AcceptedPath {
  BODY = 'body',
  PARAMS = 'params',
  QUERY = 'query',
}

const copyAllowedProperties = (schema: any, from: any = {}, to: any = {}) =>
  Object
    .keys(schema)
    .reduce((object, prop) => {
      object[prop] = from[prop];
      return object;
    }, to);

function JoiValidate(schema: any, path: AcceptedPath = AcceptedPath.BODY, options: Joi.ValidationOptions = {}) {
  return (req: Request, res: Response, next: NextFunction) => {
    const opts = Object.assign({}, { abortEarly: false }, options);

    const keyedSchema: any = {};
    keyedSchema[path] = schema;

    const reqSchema = Joi
      .object()
      .keys(keyedSchema)
      .unknown(true);

    Joi
      .validate(req, reqSchema, opts)
      .then((result) => {
        // as Joi is autosanitizing move everything back to request
        switch (path) {
          case AcceptedPath.PARAMS:
            copyAllowedProperties(schema, result.params, req.params);
            break;
          case AcceptedPath.QUERY:
            copyAllowedProperties(schema, result.query, req.query);
            break;
          default:
            copyAllowedProperties(schema, result.body, req.body);
            break;
        }
        next();
      })
      .catch((err) => next(badRequest(undefined, err.details)));
  };
}

export default JoiValidate;
