import morgan from 'morgan';

export default (app, config, logStream) => {

  const format = config.shared.env !== 'production' ? 'dev' : 'combined';

  app.use(morgan(format, { stream: logStream }));
};