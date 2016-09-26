export default (error, config, logger, handledCallback) => {

   const messagePrefix = '[SERVER ] LISTEN_ERROR:';

   switch (error.code) {
      case 'EACCES':
         logger.error(`${messagePrefix} Port ${config.webServerPort} requires elevated privileges`);
         break;
      case 'EADDRINUSE':
         logger.error(`${messagePrefix} Port ${config.webServerPort} is already in use`);
         break;
      default:
         throw error;
  }

   if (handledCallback !== undefined) {
      handledCallback();
   }
};