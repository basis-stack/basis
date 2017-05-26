import fs from 'fs';
import express from 'express';

import { dynamicImport } from './../core/utilities';

export default (app, container) => {

  const logMessagePrefix = '[STARTUP]';
  const logger = container.resolve(container.keys.logger);
  const router = express.Router();
  const routes = fs.readdirSync(__dirname)
                   .filter(item => !item.includes('.js'));

  routes.forEach((r) => {

    try {

      const route = dynamicImport(`routes/${r}`);

      // TODO: Check to see if the imported route (route.default) a) is a function and b) takes router as a parameter --> And throw 'Invalid Route Definition' error if not

      route.default(router);
      logger.info(`${logMessagePrefix} INIT: Wired base route '${r}'`);
    } catch (error) {

      logger.warn(`${logMessagePrefix} INVALID_ROUTE: Unable to initialise route '${r}'. Error: ${error.message}`);
    }
  });

  app.use(router);
};