import express from 'express';

import container from './core/container';
import { AppBuilder } from './middleware/appBuilder';

export const getApp = () => {

  container.initialise();
  const appBuilder = AppBuilder.create(express());

  return appBuilder.useHandlebars()
                   .logRequests()
                   .useBodyParser()
                   .useCookieParser()
                   .useRoutes()
                   .handleErrors()
                   .trustProxy()
                   .result;
};