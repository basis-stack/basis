import logger from './../controllers/loggingController';
import app from './../app';

function onError(error) {

   // Handle errors here
}

function onListening() {

   // Handle onListening status here

   console.log('listening on port ' + app.settings.webServerPort);
}

app.listen(app.settings.webServerPort, onListening);