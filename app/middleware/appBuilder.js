import path from 'path';

import requestLogger from './requestLogger';
import { ErrorsController } from './../controllers/errorsController';
import routes from './../routes';
import logger from './../services/logger';

export class AppBuilder {

   constructor(app) {

      this._app = app;
   }

   get result() {

      return this._app;
   }

   handleErrors() {

      this._app.use(ErrorsController.handle404);
      this._app.use(ErrorsController.handleServerError);

      return this;
   }

   logRequests() {

      this._app.use(requestLogger(logger.logStream));

      return this;
   }

   trustProxy() {

      this._app.enable('trust proxy');

      return this;
   }

   useHandlebars() {

      return this._setViewEngine('hbs');
   }

   useRoutes() {

      this._app.use(routes);

      return this;
   }

   useSettings(appSettings) {

      this._app.settings = appSettings;

      return this;
   }

   // addVendorHandlers() {

   //    // TODO: Add app.use() constructs here for all 3rd party handlers
   //    // (e.g. bodyParser, cookieParser, logging, helmet, etc)

   //    return this;
   // }

   _setViewEngine(engineKey) {

      this._app.set('views', path.join(__dirname, 'views'));
      this._app.set('view engine', engineKey);

      return this;
   }
}