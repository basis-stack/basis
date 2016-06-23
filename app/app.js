import express from 'express';
import jsonfile from 'jsonfile';

import { MiddlewareInitializer } from './middleware/middlewareInitializer';

const settings = jsonfile.readFileSync(__dirname + '/../settings.json');
const app = express();

app.settings = settings;

MiddlewareInitializer.setViewEngine(app);
MiddlewareInitializer.addAppRouteHandlers(app);
MiddlewareInitializer.addErrorHandlers(app);

export default app;