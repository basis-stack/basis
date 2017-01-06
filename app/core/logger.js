import config from './config';
import { WinstonProvider } from './winstonProvider';

export class Logger {

   constructor(winston) {

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

export default new Logger(WinstonProvider.getInstance(config));