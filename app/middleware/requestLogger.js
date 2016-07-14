import morgan from 'morgan';

export default (logStream) => {

      // TODO: Tweak appropriate output format, and plug in the logStream
   return morgan('dev');
}