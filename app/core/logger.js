import { WinstonProvider } from './winstonProvider';

export class Logger {

   constructor(config, winston = WinstonProvider.getInstance(config)) {

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