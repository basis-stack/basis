import morgan from 'morgan';

export default (logStream) => {

   // TODO: Tweak appropriate output format, and plug in the logStream (so logs to winston and not console !!!)

   // TODO: Make the output format env specific (based on env config)

   return morgan('dev');
}