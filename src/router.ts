import { Request, Response, Router } from 'express';

const apiRouter = Router();

apiRouter
  .route('/product-categories/:id')
  .get((req: Request, res: Response) => {
    res.json({});
  });

export default apiRouter;
