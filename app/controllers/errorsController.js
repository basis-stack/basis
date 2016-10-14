export class ErrorsController {

   constructor(logger, config) {

      this._logger = logger;
      this._config = config;
   }

   handle404(req, res, next) {

      const err = new Error('Resource Not Found');
      err.status = 404;
      next(err);
   }

   handleServerError(err, req, res, next) {

      const status = err.status || 500;
      const errorDetail = this._getErrorDetail(status, err);

      if (status !== 404) {
         this._logger.error(`[EXPRESS] SERVER_ERROR: ${status} - ${err.message}`);
      }

      res.status(status);
      res.send(errorDetail);
   }

   _getErrorDetail(status, err) {

      return {
         status: status,
         message: err.message,
         error: this._config.envName !== 'production' ? err : {}
      };
   }
}