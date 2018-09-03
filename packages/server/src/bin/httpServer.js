import http from 'http';

import constants from '../core/constants';
import { onListening, onError } from './handlers';
import { terminate } from '../core/utilities';
import createApp from '../app';

export default (container, routes) => {

  const config = container.resolve(container.instanceKeys.config);
  const logger = container.resolve(container.instanceKeys.logger);

  logger.info(`${constants.text.logging.startupPrefix} INIT: bootstrapped config for env: ${config.shared.env.toUpperCase()}`);

  // TODO: If we are in socketOnly mode (i.e. routes.length === 0), then don't need to create the Express app (nor pass to createServer).
  // In this case, we only need to create a dummy handler to handle all requests and just 404.
  //
  // http.createServer((request, response) => {
  //  response.writeHead(404);
  //  response.end();
  // });

  const app = createApp(container, routes);
  const server = http.createServer(app);

  server.listen(config.server.webServerPort);
  server.on('error', (error) => { onError(config, logger, error, () => { terminate(1); }); });
  server.on('listening', () => { onListening(config, logger); });

  return server;
};
