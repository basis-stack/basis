import http from 'http';

import { onListening, onError } from './handlers';
import terminate from './processHelpers';
import createApp from './../app';

export default (container) => {

  const config = container.resolve(container.keys.config);
  const logger = container.resolve(container.keys.logger);

  const app = createApp(container);
  const server = http.createServer(app);

  server.listen(config.webServerPort);
  server.on('error', (error) => { onError(config, logger, error, () => { terminate(1); }); });
  server.on('listening', () => { onListening(config, logger); });

  return server;
};
