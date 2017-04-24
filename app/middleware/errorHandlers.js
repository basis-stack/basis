function getErrorDetail(config, status, err) {

  return {
    status,
    message: err.message,
    error: config.env !== 'production' ? err : {}
  };
}

export const handle404 = (req, res, next) => {

  const err = new Error('Resource Not Found');
  err.status = 404;
  next(err);
};

export const handleServerError = (config, logger, err, req, res) => {

  const status = err.status || 500;
  const errorDetail = getErrorDetail(config, status, err);

  if (status !== 404) {

    logger.error(`[EXPRESS] SERVER_ERROR: ${status} - ${err.message}`);
  }

  res.status(status);
  res.render('error', errorDetail);
};