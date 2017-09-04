import constants from './../core/constants';

export const onListening = (config, logger) => {

  logger.info(`${constants.text.logging.serverPrefix} STARTED: listening on port ${config.server.webServerPort}`);
};

export const onError = (config, logger, error, handledCallback) => {

  if (error.syscall !== 'listen') {
    throw error;
  }

  const messagePrefix = `${constants.text.logging.serverPrefix} LISTEN_ERROR:`;

  switch (error.code) {

    case 'EACCES':
      logger.error(`${messagePrefix} port ${config.server.webServerPort} requires elevated privileges`);
      handledCallback();
      break;

    case 'EADDRINUSE':
      logger.error(`${messagePrefix} port ${config.server.webServerPort} is already in use`);
      handledCallback();
      break;

    default:
      throw error;
  }
};