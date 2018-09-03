import path from 'path';

import { getRootPath } from '../core/utilities';

// Middleware
import initialiseAuthentication from './authentication';
import initialiseContent from './content';
import initialiseDataParsers from './dataParsers';
import initialiseErrorHandlers from './errorHandlers';
import initialiseRequestLogger from './logging';
import initialiseSecurity from './security';

// Routes
import initialiseRoutes from './routes';

// TODO: Need to decide if this app builder pattern is the most effective way of hooking up all the various middleware, roputes, etc and what a specific app actually wants.
//       Could get a bit gnarly with lots of middleware, and so the chain calls might get a bit verbose. Not sure, need to play with it and see how feels.
//       Could always have config to drive each middleware option and have a wrapper 'useIf' call that checks the config. That way could be config driven if needs be, and app.js would remain
//       consistent in each application.
//       Or even have each middleware initialiser as a strategy (pattern), with each defining their precedence and their init function. Then this builder could just pull them in dynamically
//       and register with the app. That way could scale better, and apps could specify exactly want they want as middleware and in what order.

export default class AppBuilder {

  constructor(container, app) {

    this._app = app;

    this._container = container;
    this._config = container.resolve(container.instanceKeys.config);
    this._logger = container.resolve(container.instanceKeys.logger);
  }

  static create(container, app) {

    return new AppBuilder(container, app);
  }

  get result() {

    return this._app;
  }

  defaultContent() {

    initialiseContent(this._app);

    return this;
  }

  handleErrors() {

    // TODO: Need to ensure that this is the last middleware include to be called.

    initialiseErrorHandlers(this._app, this._config, this._logger);

    return this;
  }

  logRequests() {

    // TODO: Need to ensure that this is first middleware include called.

    initialiseRequestLogger(this._app, this._config, this._logger.logStream);

    return this;
  }

  secure() {

    initialiseSecurity(this._app);

    return this;
  }

  trustProxy() {

    this._app.enable('trust proxy');

    return this;
  }

  useAuthentication() {

    this._passport = initialiseAuthentication(this._app, this._container);

    return this;
  }

  useDataParsers() {

    initialiseDataParsers(this._app);

    return this;
  }

  useEjs() {

    return this._setViewEngine('ejs');
  }

  useRoutes(routes) {

    // TODO: Need to ensure that this is called inbetween 'base' middleware (parsers and such) and error handlers. How best to do this ?

    initialiseRoutes(this._app, this._container, routes);

    return this;
  }

  _setViewEngine(engineKey) {

    this._app.set('views', path.join(getRootPath(), 'views'));
    this._app.set('view engine', engineKey);

    return this;
  }
}