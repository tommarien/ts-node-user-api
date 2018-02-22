import { notFound } from 'boom';
import { NextFunction, Request, Response } from 'express';
import productCategoryMapper from '../mappers/product-category-mapper';
import verifyParamIsObjectId from '../middleware/verify-param-is-objectId';
import productCategory from '../models/product-category';
import { resourceNotFound } from '../utility/errors';

const RESOURCE_NAME = 'ProductCategory';

export const getById = [
  verifyParamIsObjectId('id', RESOURCE_NAME),
  (req: Request, res: Response, next: NextFunction) => {
    return productCategory
      .findById(req.params.id)
      .lean()
      .exec()
      .then((category) => {
        if (!category) {
          throw resourceNotFound(RESOURCE_NAME, req.params.id);
        }

        const resource = productCategoryMapper.map(category);
        res.json(resource);
      })
      .catch(err => next(err));
  }];
