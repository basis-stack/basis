import config from './../services/config';
import logger from './../services/logger';
import app from './../app';

function onError(error) {

   // Handle errors here
}

function onListening() {

   // Handle onListening status here

   logger.info('[SERVER ] STARTED: listening on port ' + config.webServerPort);
}

app.listen(config.webServerPort, onListening);