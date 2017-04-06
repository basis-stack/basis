import http from 'http';

import handleError from './errorHandler';
import { default as createApp } from './../app';

function onListening(config, logger) {

  logger.info(`[SERVER ] STARTED: listening on port ${config.webServerPort}`);
}

export default (container, exit = process.exit) => {

  const config = container.resolve(container.keys.config);
  const logger = container.resolve(container.keys.logger);

  const app = createApp(container);
  const server = http.createServer(app);

  server.listen(config.webServerPort);
  server.on('error', (error) => { handleError(error, config, logger, () => { exit(1); }); });
  server.on('listening', () => { onListening(config, logger); });

  return server;
};