import http from 'http';

import handleError from './errorHandler';
import container from './../core/container';

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