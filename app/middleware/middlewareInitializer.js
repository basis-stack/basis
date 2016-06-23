import path from 'path';
import { ErrorsController } from './../controllers/errorsController';
import routes from './../routes';

export class MiddlewareInitializer {

   static setViewEngine(app) {

      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'hbs');
   }

   static addVendorHandlers(app) {

      // TODO: Add app.use() constructs here for all 3rd party handlers
      // (e.g. bodyParser, cookieParser, logging, helmet, etc)
   }

   static addAppRouteHandlers(app) {

      app.use(routes);
   }

   static addErrorHandlers(app) {

      app.use(ErrorsController.handle404);
      app.use(ErrorsController.handleServerError);
   }

   // TODO: Add more methods for initialising the static files dir & core routes & errors
}