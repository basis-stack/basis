import winston from 'winston';

export class WinstonProvider {

  static getInstance(config) {

    return new (winston.Logger)(this._getWinstonOptions(config));
  }

  static _getWinstonOptions(config) {

    const options = { transports: [] };

    if (config.env === 'local') {
      options.transports.push(new (winston.transports.Console)());
    } else {
      options.transports.push(new (winston.transports.File)({ filename: this._getLogFilePath(config) }));
    }

    return options;
  }

  static _getLogFilePath(config) {

    // TODO: Need to create the logPath dir if it doesn't yet exist !!!

    // TODO: Actually get logPath working and not erroring :/

    //return path.join(config.logPath, `${config.appName}-${config.env}.log`);
    return `${config.appName}-${config.env}.log`;
  }
}