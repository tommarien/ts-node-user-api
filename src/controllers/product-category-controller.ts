import { notFound } from 'boom';
import { NextFunction, Request, Response } from 'express';
import * as objectMapper from 'object-mapper';
import productCategory from '../models/product-category';

export const getById = (req: Request, res: Response, next: NextFunction) => {
  return productCategory
    .findById(req.params.id)
    .then((category) => {
      if (!category) {
        throw notFound(`The resource 'ProductCategory' is not found (id:'${req.params.id}')`);
      }

      const resource = objectMapper(category, {
        _id: 'id',
        code: 'code',
        description: 'description',
        name: 'name',
      });

      res.json(resource);
    })
    .catch(err => next(err));
};
