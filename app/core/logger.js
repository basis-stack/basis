import { default as getWinston} from './../core/winstonProvider';

export class Logger {

  constructor(config, winston = getWinston(config)) {

    this._winston = winston;
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