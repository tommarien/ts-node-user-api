import * as express from 'express';
import { notFound } from 'boom';
import * as expressRequestId from 'express-request-id';

import errorHandler from './middleware/error-handler';


const app = express();

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressRequestId());

app.get('/', (req: express.Request, res: express.Response) => {
  return res.json({ message: 'Yes, we are live' });
});

// Generic catch all route
app.use((req: express.Request, res: express.Response, next: express.NextFunction) =>
  next(notFound()));

// Boom error handler
app.use(errorHandler);

export default app;
