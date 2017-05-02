const getErrorDetail = (config, status, err) => {

  const details = {
    status,
    message: err.message,
    error: (config.env === 'production' || status === 404) ? {} : err
  };

  return details;
};

const handle404 = (req, res, next) => {

  const err = new Error('Resource Not Found');
  err.status = 404;
  next(err);
};

const handleServerError = (config, logger, err, req, res) => {

  const status = err.status || 500;
  const errorDetail = getErrorDetail(config, status, err);

  if (status !== 404) {

    logger.error(`[EXPRESS] SERVER_ERROR: ${status} - ${err.message}`);
  }

  res.status(status);
  res.render('error', errorDetail);
};

export default (app, config, logger) => {

  app.use(handle404);
  app.use((err, req, res, next) => { handleServerError(config, logger, err, req, res); });
};