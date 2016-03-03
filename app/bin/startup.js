import jsonfile from 'jsonfile';
import logger from './../controllers/loggingController';
import app from './../app';

const settings = jsonfile.readFileSync(__dirname + '/../../settings.json');

app.listen(settings.webServerPort, onListening);

function onError(error) {

   // Handle errors here
}

function onListening() {

   // Handle onListening status here

   console.log('listening on port ' + settings.webServerPort);
}