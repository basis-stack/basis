import express from 'express';
import jsonfile from 'jsonfile';
import { AppBuilder } from './middleware/appBuilder';

const settings = jsonfile.readFileSync(__dirname + '/../settings.json');
const appBuilder = new AppBuilder(express());

const app = appBuilder.useHandlebars()
                      .logRequests()
                      .useRoutes()
                      .handleErrors()
                      .useSettings(settings)
                      .result;

export default app;