import http from 'http';

import constants from './../core/constants';
import { onListening, onError } from './handlers';
import terminate from './../core/utilities';
import createApp from './../app';

export default (container) => {

  const config = container.resolve(container.keys.config);
  const logger = container.resolve(container.keys.logger);

  logger.info(`${constants.text.logging.startupPrefix} INIT: Bootstrapped config for env: ${config.env.toUpperCase()}`);

  const app = createApp(container);
  const server = http.createServer(app);

  server.listen(config.webServerPort);
  server.on('error', (error) => { onError(config, logger, error, () => { terminate(1); }); });
  server.on('listening', () => { onListening(config, logger); });

  return server;
};
