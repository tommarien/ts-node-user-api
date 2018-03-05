import { notFound } from 'boom';
import * as express from 'express';
import * as expressRequestId from 'express-request-id';
import * as swaggerUi from 'swagger-ui-express';
import * as YamlJs from 'yamljs';

import errorHandler from './middleware/error-handler';
import router from './router';
const swaggerDocument = YamlJs.load('swagger.yml');

const app = express();

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressRequestId());

app.get('/', (req: express.Request, res: express.Response) => {
  return res.json({ message: 'Yes, we are live' });
});

app.use('/api', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Generic catch all route
app.use((req: express.Request, res: express.Response, next: express.NextFunction) =>
  next(notFound()));

// Boom error handler
app.use(errorHandler);

export default app;
