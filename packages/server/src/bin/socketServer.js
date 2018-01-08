import WebSocket from 'ws';

import constants from './../core/constants';

export default (container, server, channels) => {

  const wsServer = new WebSocket.Server({ server });

  const logger = container.resolve(container.instanceKeys.logger);
  logger.info(`${constants.text.logging.serverPrefix} START: attached WebSocket server to HTTP server`);

  wsServer.on('connection', (ws, req) => {

    channels.forEach((c) => {

      c.init(container, ws, req);
    });
  });
};