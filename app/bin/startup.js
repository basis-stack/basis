import jsonfile from 'jsonfile';
import logger from './../controllers/loggingController';
import app from './../app';

// TODO: Move this getting of settings to app.js and store as object on app itself
const settings = jsonfile.readFileSync(__dirname + '/../../settings.json');

function onError(error) {

   // Handle errors here
}

function onListening() {

   // Handle onListening status here

   console.log('listening on port ' + settings.webServerPort);
}

app.listen(settings.webServerPort, onListening);