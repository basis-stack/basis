import express from 'express';

import AppBuilder from './middleware/appBuilder';

export default (container, routes) => {

  const appBuilder = AppBuilder.create(container, express());

  return appBuilder.useEjs()
                   .logRequests()
                   .useDataParsers()
                   .secure()
                   .defaultContent()
                   .useRoutes(routes)
                   .handleErrors()
                   .trustProxy()
                   .result;
};
