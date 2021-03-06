import { conflict, notFound } from 'boom';
import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import productCategoryMapper from '../mappers/product-category-mapper';
import JoiValidate, { AcceptedPath } from '../middleware/joi-validate';
import verifyParamIsObjectId from '../middleware/verify-param-is-objectId';
import productCategory from '../models/product-category';
import { resourceNotFound } from '../utility/errors';
import { DUPLICATE_KEY } from '../utility/mongoErrors';
import productCategoryValidationSchema from '../validation/product-category-validation-schema';

const RESOURCE_NAME = 'ProductCategory';

export const post = [
  JoiValidate(productCategoryValidationSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const category = new productCategory();
    category.code = req.body.code;
    category.name = req.body.name;
    category.description = req.body.description;

    return category
      .save()
      .then(() => {
        const resource = productCategoryMapper.map(category);
        res.status(201).json(resource);
      })
      .catch((err) => {
        if (err.code === DUPLICATE_KEY) {
          return next(conflict(`The '${RESOURCE_NAME}' already exists (code:'${category.code}')`));
        }
        return next(err);
      });
  },
];

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
      .catch((err) => next(err));
  }];

export const list = [
  JoiValidate({
    limit: Joi.number().positive().default(25),
    offset: Joi.number().min(0).default(0),
  }, AcceptedPath.QUERY),
  (req: Request, res: Response, next: NextFunction) => {
    return productCategory
      .paginate({}, {
        lean: true,
        limit: req.query.limit,
        offset: req.query.offset,
        sort: {
          code: 1,
        },
      })
      .then(({ docs, limit, offset, total }) => {
        const items = productCategoryMapper.mapMany(docs);

        res.json({
          items,
          limit,
          offset,
          total,
        });
      })
      .catch(next);
  },
];
