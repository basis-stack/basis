import http from 'http';

import config from './../core/config';
import logger from './../core/logger';
import handleError from './errorHandler';

import app from './../app';

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