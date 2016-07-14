import morgan from 'morgan';

export default (logStream) => {

   // TODO: Tweak appropriate output format

   // TODO: Make the output format env specific (based on env config)

   return morgan('dev', { 'stream': logStream });
}