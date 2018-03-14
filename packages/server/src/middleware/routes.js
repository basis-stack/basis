import express from 'express';

import constants from './../core/constants';

export default (app, container, routes) => {

  const logger = container.resolve(container.instanceKeys.logger);
  const router = express.Router();

  routes.forEach((r) => {

    // TODO: Should each route (module) get its own (isolated) Router instance ?
    // i.e.: express.Router() & app.use(router) within the loop ?

    // TODO: Swap the order of these, so that is consistent with initChannels
    r.init(router, container);
    logger.info(`${constants.text.logging.startupPrefix} INIT: wired routes for module '${r.moduleKey}'`);
  });

  app.use(router);
};