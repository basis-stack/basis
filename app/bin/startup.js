import http from 'http';

import handleError from './errorHandler';
import container from './../core/container';

// TODO: This (immediate) importing of app runs quite a lot of setup / bootstrap code which could easily fail.
//       Consider making App a class with a static initialise / create factory method that returns the app instance,
//       which could then be both mocked out (for testing this startup code) and also wrapped in a try/catch to
//       gracefully handle any bootstrap errors, and then forward them to handleError.
import app from './../app';

const config = container.resolve(container.keys.config);
const logger = container.resolve(container.keys.logger);

function onError(error) {

   handleError(error, config, logger, () => { process.exit(1); });
}

function onListening() {

   logger.info(`[SERVER ] STARTED: listening on port ${config.webServerPort}`);
}

const server = http.createServer(app);
server.listen(config.webServerPort);
server.on('error', onError);
server.on('listening', onListening);