import path from 'path';

import requestLogger from './requestLogger';
import { ErrorsController } from './../controllers/errorsController';
import routes from './../routes';
import container from './../services/container';

export class AppBuilder {

   constructor(app, config, logger) {

      this._app = app;
      this._config = config;
      this._logger = logger;

      this._errorController = new ErrorsController(this._logger, this._config);
   }

   get result() {

      return this._app;
   }

   handleErrors() {



      this._app.use(this._errorController.handle404);
      this._app.use((err, req, res, next) => { this._errorController.handleServerError(err, req, res, next); });

      return this;
   }

   logRequests() {

      this._app.use(requestLogger(this._logger.logStream));

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

   // useSettings(appSettings) {

   //    this._app.settings = appSettings;

   //    return this;
   // }

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