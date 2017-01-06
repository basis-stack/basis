import express from 'express';

import { AppBuilder } from './middleware/appBuilder';

const appBuilder = new AppBuilder(express());

export default appBuilder.useHandlebars()
                         .logRequests()
                         .useBodyParser()
                         .useCookieParser()
                         .useRoutes()
                         .handleErrors()
                         .trustProxy()
                         .result;