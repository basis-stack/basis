import winston from 'winston';

function getLogFilePath(config) {

  // TODO: Need to create the logPath dir if it doesn't yet exist !!!

  // TODO: Actually get logPath working and not erroring :/

  return `${config.appName}-${config.env}.log`;
}

function getWinstonOptions(config) {

  const options = { transports: [] };

  if (config.env === 'local') {
    options.transports.push(new (winston.transports.Console)());
  } else {
    options.transports.push(new (winston.transports.File)({ filename: getLogFilePath(config) }));
  }

  return options;
}

export default config => new (winston.Logger)(getWinstonOptions(config));