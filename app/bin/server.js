import http from 'http';

import handleError from './errorHandler';
import { createApp } from './../app';

function onError(error, config, logger) {

  handleError(error, config, logger, () => { process.exit(1); });
}

function onListening(config, logger) {

  logger.info(`[SERVER ] STARTED: listening on port ${config.webServerPort}`);
}

export const createServer = (container) => {

  const config = container.resolve(container.keys.config);
  const logger = container.resolve(container.keys.logger);

  const app = createApp(container);
  const server = http.createServer(app);

  server.listen(config.webServerPort);
  server.on('error', (error) => { onError(error, config, logger); });
  server.on('listening', () => { onListening(config, logger); });

  return server;
};