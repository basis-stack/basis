import express from 'express';
import jsonfile from 'jsonfile';

import { MiddlewareInitializer } from './middleware/middlewareInitializer';

const settings = jsonfile.readFileSync(__dirname + '/../settings.json');
const initializer = new MiddlewareInitializer(express(), settings);

const app = initializer.setViewEngine()
                       .addVendorHandlers()
                       .addAppRouteHandlers()
                       .addErrorHandlers()
                       .result;

export default app;