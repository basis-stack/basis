import express from 'express';

import container from './core/container';
import { AppBuilder } from './middleware/appBuilder';

export default () => {

  container.initialise();
  const appBuilder = new AppBuilder(express());

  return appBuilder.useHandlebars()
                   .logRequests()
                   .useBodyParser()
                   .useCookieParser()
                   .useRoutes()
                   .handleErrors()
                   .trustProxy()
                   .result;
};

