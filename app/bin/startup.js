import jsonfile from 'jsonfile';
import logger from './../controllers/loggingController';
import app from './../app';

const settings = jsonfile.readFileSync(__dirname + '/../../settings.json');

function onError(error) {

   // Handle errors here
}

function onListening() {

   // Handle onListening status here
}