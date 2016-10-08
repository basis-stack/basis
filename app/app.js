import express from 'express';
import { config, logger } from './registrar';
import { AppBuilder } from './middleware/appBuilder';

const appBuilder = new AppBuilder(express(), config, logger);

export default appBuilder.useHandlebars()
                         .logRequests()
                         .useRoutes()
                         .handleErrors()
                         .trustProxy()
                         .result;