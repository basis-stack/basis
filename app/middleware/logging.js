import morgan from 'morgan';

export const getRequestLogger = (config, logStream) => {

   const format = config.env !== 'production' ? 'dev' : 'combined';

   return morgan(format, { 'stream': logStream });
}