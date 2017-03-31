// TODO: Should rename this to startupErrorHandler (So as to not confuse with error controller or any other error handler) ?

export default (error, config, logger, handledCallback) => {

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