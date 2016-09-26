import http from 'http';

import './../registrar';
import container from './../services/container';
import app from './../app';
import handleListenError from './errorHandler';

const config = container.resolve('config');
const logger = container.resolve('logger');

function onError(error) {

   if (error.syscall !== 'listen') {
      throw error;
   }

   handleListenError(error, config, logger, () => { process.exit(1); });
}

function onListening() {

   logger.info(`[SERVER ] STARTED: listening on port ${config.webServerPort}`);
}

const server = http.createServer(app);
server.listen(config.webServerPort);
server.on('error', onError);
server.on('listening', onListening);