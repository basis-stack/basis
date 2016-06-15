import express from 'express';
import jsonfile from 'jsonfile';

import routes from './routes';
import { ErrorsController } from './controllers/errorsController';

const settings = jsonfile.readFileSync(__dirname + '/../settings.json');
const app = express();

app.settings = settings;

app.use(routes);
app.use(ErrorsController.handle404);
app.use(ErrorsController.handleServerError);

export default app;