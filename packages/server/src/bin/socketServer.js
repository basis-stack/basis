import WebSocket from 'ws';

import constants from './../core/constants';

const onSocketError = (logger, error) => {

  // TODO: Check for specific ECONNRESET error code and log an appropriate warning (Connection closed)

  console.log(error);
};

export default (container, server, channels) => {

  const wsServer = new WebSocket.Server({ server });

  const logger = container.resolve(container.instanceKeys.logger);
  logger.info(`${constants.text.logging.serverPrefix} START: attached WebSocket server to HTTP server`);

  wsServer.on('connection', (ws, req) => {

    ws.on('error', (error) => { onSocketError(logger, error); });

    channels.forEach((c) => {

      c.init(container, ws, req);
    });
  });
};