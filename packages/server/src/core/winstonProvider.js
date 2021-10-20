import { createLogger, transports, format } from 'winston';

function getLogFilePath(config) {

  // TODO: Need to create the logPath dir if it doesn't yet exist !!!

  // TODO: Actually get logPath working and not erroring :/

  return `${config.shared.appName}-${config.shared.env}.log`;
}

function getWinstonOptions(config) {

  const { Console, File } = transports;
  const options = { level: 'info', transports: [] };

  if (config.shared.env === 'local' || config.shared.env === 'default') {

    options.transports.push(new Console({ format: format.simple() }));
  } else {

    options.transports.push(new File({ filename: getLogFilePath(config) }));
  }

  return options;
}

export default config => createLogger(getWinstonOptions(config));
