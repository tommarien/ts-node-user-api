import * as express from 'express';
const app = express();


// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: express.Request, res: express.Response) => {
  return res.json({ message: 'Yes we are live' });
});

export default app;
