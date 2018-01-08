import express from 'express';

import constants from './../core/constants';

export default (app, container, routes) => {

  const logger = container.resolve(container.instanceKeys.logger);
  const router = express.Router();

  routes.forEach((r) => {

    r.init(router, container);
    logger.info(`${constants.text.logging.startupPrefix} INIT: wired routes for module '${r.moduleKey}'`);
  });

  app.use(router);
};