import path from 'path';
import { ErrorsController } from './../controllers/errorsController';
import routes from './../routes';

export class MiddlewareInitializer {

   constructor(app, appSettings) {

      this._app = app;
      this._app.settings = appSettings;
   }

   get result() {

      return this._app;
   }

   setViewEngine() {

      this._app.set('views', path.join(__dirname, 'views'));
      this._app.set('view engine', 'hbs');

      return this;
   }

   addVendorHandlers() {

      // TODO: Add app.use() constructs here for all 3rd party handlers
      // (e.g. bodyParser, cookieParser, logging, helmet, etc)

      return this;
   }

   addAppRouteHandlers() {

      this._app.use(routes);

      return this;
   }

   addErrorHandlers() {

      this._app.use(ErrorsController.handle404);
      this._app.use(ErrorsController.handleServerError);

      return this;
   }
}