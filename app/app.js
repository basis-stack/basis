import express from 'express';

import { AppBuilder } from './middleware/appBuilder';

export const createApp = (container) => {

  const appBuilder = AppBuilder.create(container, express());

  return appBuilder.useHandlebars()
                   .logRequests()
                   .useBodyParser()
                   .useCookieParser()
                   .useRoutes()
                   .handleErrors()
                   .trustProxy()
                   .result;
};