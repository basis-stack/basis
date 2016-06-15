import express from 'express';
import routes from './routes';
import { ErrorsController } from './controllers/errorsController';

const app = express();

app.use(routes);
app.use(ErrorsController.handle404);
app.use(ErrorsController.handleServerError);

export default app;