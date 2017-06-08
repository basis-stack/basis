import HTTPStatus from 'http-status';

const getErrorDetail = (config, status, err) => {

  const statusText = HTTPStatus[status];
  const details = {
    status,

    // TODO: Assert these !!!
    statusText,
    title: `Error ${status} (${statusText})`,

    message: err.message,
    error: (config.env === 'production' || status === HTTPStatus.NOT_FOUND) ? {} : err
  };

  return details;
};

const handle404 = (req, res, next) => {

  const err = new Error('The requested URL was not found on this server');
  err.status = HTTPStatus.NOT_FOUND;
  next(err);
};

const handleServerError = (config, logger, err, req, res) => {

  const status = err.status || HTTPStatus.INTERNAL_SERVER_ERROR;
  const errorDetail = getErrorDetail(config, status, err);

  if (status !== HTTPStatus.NOT_FOUND) {

    logger.error(`[EXPRESS] SERVER_ERROR: ${status} - ${err.message}`);
  }

  res.status(status);
  res.render('error', errorDetail);
};

export default (app, config, logger) => {

  app.use(handle404);
  app.use((err, req, res, next) => { handleServerError(config, logger, err, req, res); });
};