import http from 'http';

import { config, logger } from './../registrar';
import app from './../app';
import handleError from './errorHandler';

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