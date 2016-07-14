import logger from './../services/logger';
import app from './../app';

function onError(error) {

   // Handle errors here
}

function onListening() {

   // Handle onListening status here

   logger.info('[SERVER ] STARTED: listening on port ' + app.settings.webServerPort);
}

app.listen(app.settings.webServerPort, onListening);