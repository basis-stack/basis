
export const onListening = (config, logger) => {

  logger.info(`[SERVER ] STARTED: listening on port ${config.webServerPort}`);
}

export const onError = (error, config, logger, handledCallback) => {

  if (error.syscall !== 'listen') {
    throw error;
  }

  const messagePrefix = '[SERVER ] LISTEN_ERROR:';

  switch (error.code) {

    case 'EACCES':
      logger.error(`${messagePrefix} Port ${config.webServerPort} requires elevated privileges`);
      handledCallback();
      break;

    case 'EADDRINUSE':
      logger.error(`${messagePrefix} Port ${config.webServerPort} is already in use`);
      handledCallback();
      break;

    default:
      throw error;
  }
};