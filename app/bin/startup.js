import config from './../services/config';
import logger from './../services/logger';
import app from './../app';
import http from 'http';
import handleListenError from './errorHandler';

function onError(error) {

   if (error.syscall !== 'listen') {
      throw error;
   }

   handleListenError(error, config, () => { process.exit(1); });
}

function onListening() {

   logger.info(`[SERVER ] STARTED: listening on port ${config.webServerPort}`);
}

const server = http.createServer(app);
server.listen(config.webServerPort);
server.on('error', onError);
server.on('listening', onListening);