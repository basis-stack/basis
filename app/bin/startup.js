import jsonfile from 'jsonfile';
import app from '../app';

const settings = jsonfile.readFileSync(__dirname + '/../../settings.json');
console.log(settings);