import { Request, Response, Router } from 'express';
import * as ProductCategoryController from './controllers/product-category-controller';

const apiRouter = Router();

apiRouter
  .route('/product-categories')
  .post(ProductCategoryController.post);

apiRouter
  .route('/product-categories/:id')
  .get(ProductCategoryController.getById);

export default apiRouter;
