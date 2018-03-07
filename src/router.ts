import { Request, Response, Router } from 'express';
import * as ProductCategoryController from './controllers/product-category-controller';

const apiRouter = Router();

apiRouter
  .route('/v1/product-categories')
  .get(ProductCategoryController.list)
  .post(ProductCategoryController.post);

apiRouter
  .route('/v1/product-categories/:id')
  .get(ProductCategoryController.getById);

export default apiRouter;
