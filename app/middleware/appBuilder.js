import path from 'path';

// Routes
import initialiseRoutes from './../routes';

// Middleware
import initialiseRequestLogger from './logging';
import initialiseDataParsers from './dataParsers';
import initialiseErrorHandlers from './errorHandlers';

// TODO: Need to decide if this app builder pattern is the most effective way of hooking up all the various middleware, roputes, etc and what a specific app actually wants.
//       Could get a bit gnarly with lots of middleware, and so the chain calls might get a bit verbose. Not sure, need to play with it and see how feels.
//       Could always have config to drive each middleware option and have a wrapper 'useIf' call that checks the config. That way could be config driven if needs be, and app.js would remain
//       consistent in each application.

export default class AppBuilder {

  constructor(container, app) {

    this._app = app;

    this._container = container;
    this._config = container.resolve(container.keys.config);
    this._logger = container.resolve(container.keys.logger);
  }

  static create(container, app) {

    return new AppBuilder(container, app);
  }

  get result() {

    return this._app;
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

  trustProxy() {

    this._app.enable('trust proxy');

    return this;
  }

  useHandlebars() {

    return this._setViewEngine('hbs');
  }

  useRoutes() {

    // TODO: Need to ensure that this is called inbetween 'base' middleware (parsers and such) and error handlers. How best to do this ?
    initialiseRoutes(this._app, this._container);

    return this;
  }

  useDataParsers() {

    initialiseDataParsers(this._app);

    return this;
  }

  _setViewEngine(engineKey) {

    this._app.set('views', path.join(__dirname, '../views'));
    this._app.set('view engine', engineKey);

    return this;
  }
}