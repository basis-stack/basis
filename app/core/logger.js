import { default as getWinston} from './../core/winstonProvider';

export class Logger {

  constructor(winston) {

    this._winston = winston;
  }

  static createFromConfig(config) {

    return new Logger(getWinston(config));
  }

  get logStream() {

    return {
      write: (message, encoding) => {
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
}