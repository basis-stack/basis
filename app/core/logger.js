import getWinston from './../core/winstonProvider';

export default class Logger {

  constructor(winston) {

    this._winston = winston;
  }

  static createFromConfig(config) {

    return new Logger(getWinston(config));
  }

  get logStream() {

    return {
      write: (message) => {
        this.info(`[REQUEST] ${message.replace('\n', '')}`);
      }
    };
  }

  info(message) {

    this._winston.info(message);
  }

  error(message) {

    this._winston.error(message);
  }

  warn(message) {

    this._winston.warn(message);
  }
}