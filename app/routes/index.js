import fs from 'fs';
import express from 'express';

import { dynamicImport } from './../core/utilities';

const controllers = [];

export default (app, container) => {

  const router = express.Router();
  const routes = fs.readdirSync(__dirname)
                   .filter(item => !item.includes('.js'));

  routes.forEach((r) => {

    try {

      const route = dynamicImport(`routes/${r}`);

      // TODO: Check to see if there is not a valid controller and warn / error if not !!
      controllers.push(route.default(router));

    } catch (error) {

      const logger = container.resolve(container.keys.logger);
      logger.warn(`[STARTUP] Unable to initialise route '${r}'. Error: ${error.message}`);
    }
  });

  app.use(router);
};