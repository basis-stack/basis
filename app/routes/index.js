import fs from 'fs';
import express from 'express';

import constants from './../core/constants';
import { dynamicImport } from './../core/utilities';

export default (app, container) => {

  const logger = container.resolve(container.instanceKeys.logger);
  const router = express.Router();
  const routes = fs.readdirSync(__dirname)
                   .filter(item => !item.includes('.js'));

  routes.forEach((r) => {

    try {

      const route = dynamicImport(`routes/${r}`);

      // TODO: Check to see if the imported route (route.default) a) is a function and b) takes router as a parameter --> And throw 'Invalid Route Definition' error if not

      route.default(router);
      logger.info(`${constants.text.logging.startupPrefix} INIT: wired base route '${r}'`);
    } catch (error) {

      logger.warn(`${constants.text.logging.startupPrefix} INVALID_ROUTE: unable to initialise route '${r}'. Error: ${error.message}`);
    }
  });

  app.use(router);
};