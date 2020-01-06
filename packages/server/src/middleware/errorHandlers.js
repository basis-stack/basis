import HTTPStatus from 'http-status';

// As per https://jsonapi.org/format/#errors
const getErrorDetail = (config, status, err) => {

  const details = {
    status,
    title: err.title || `Error ${status} (${HTTPStatus[status]})`,
    detail: err.message // ,
    // TODO: How to handle callstack for non-prod envs ??
    // error: (config.shared.env === 'production' || status === HTTPStatus.NOT_FOUND) ? {} : err
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
  res.send({ errors: [errorDetail] });
};

export default (app, config, logger) => {

  app.use(handle404);
  app.use((err, req, res, next) => { handleServerError(config, logger, err, req, res); });
};