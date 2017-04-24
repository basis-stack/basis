import path from 'path';

// Routes
import routes from './../routes';

// Middleware
import getRequestLogger from './logging';
import { getJsonParser, getUrlencodedParser, getCookieParser } from './dataParsers';
import { handle404, handleServerError } from './errorHandlers';

// TODO: Need to decide if this app builder pattern (borrowed from ASP.NET MVC Core) is the most effective way of hooking up all the various middleware and what a specific app actually wants.
//     Could get a bit gnarly with lots of middleware, and so the chain calls might get a bit verbose. Not sure, need to play with it and see how feels.
//     Could always have config to drive each middleware option and have a wrapper 'useIf' call that checks the config. That way could be config driven if needs be, and app.js would remain
//     consistent in each application.

export default class AppBuilder {

  constructor(container, app) {

    this._app = app;

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

    this._app.use(handle404);
    this._app.use((err, req, res, next) => { handleServerError(this._config, this._logger, err, req, res); });

    return this;
  }

  logRequests() {

    // TODO: Need to ensure that this is first middleware include called.
    this._app.use(getRequestLogger(this._config, this._logger.logStream));

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

    this._app.use(routes());

    return this;
  }

  useCookieParser() {

    this._app.use(getCookieParser());

    return this;
  }

  useBodyParser() {

    this._app.use(getJsonParser());
    this._app.use(getUrlencodedParser());

    return this;
  }

  _setViewEngine(engineKey) {

    this._app.set('views', path.join(__dirname, '../views'));
    this._app.set('view engine', engineKey);

    return this;
  }
}