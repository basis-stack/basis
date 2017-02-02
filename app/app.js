import express from 'express';

import container from './core/container';
import { AppBuilder } from './middleware/appBuilder';

container.initialise();
const appBuilder = new AppBuilder(express());

export default appBuilder.useHandlebars()
                         .logRequests()
                         .useBodyParser()
                         .useCookieParser()
                         .useRoutes()
                         .handleErrors()
                         .trustProxy()
                         .result;