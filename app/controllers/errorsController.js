

export class ErrorsController {

   constructor(logger) {

      this._logger = logger;
   }

   handle404(req, res, next) {

      const err = new Error('Not Found');
      err.status = 404;
      next(err);
   }

   handleServerError(err, req, res, next) {

      const status = err.status || 500;

      if (status !== 404) {
         this._logger.error(`[EXPRESS] SERVER_ERROR: ${status} - ${err.message}`);
      }
      
      res.status(status);
      
      // TODO: In non-prod envs, need to also log the stack stace as per express generator template
      res.send(err.message);
   }
}