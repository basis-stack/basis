//import logger from './../services/logger';

export class ErrorsController {

   static handle404(req, res, next) {

      const err = new Error('Not Found');
      err.status = 404;
      next(err);
   }

   static handleServerError(err, req, res, next) {

      //const messagePrefix = '[EXPRESS] SERVER_ERROR: ';
      const status = err.status || 500;
      //logger.error(`${messagePrefix}${status} - ${err.message}`);

      res.status(status);
      res.send(err.message);
   }
}