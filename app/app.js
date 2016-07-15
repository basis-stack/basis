import express from 'express';
import { AppBuilder } from './middleware/appBuilder';

const appBuilder = new AppBuilder(express());

export default appBuilder.useHandlebars()
                         .logRequests()
                         .useRoutes()
                         .handleErrors()
                         .trustProxy()
                         .result;