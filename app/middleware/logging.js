import morgan from 'morgan';

export default (config, logStream) => {

  const format = config.env !== 'production' ? 'dev' : 'combined';

  return morgan(format, { stream: logStream });
};