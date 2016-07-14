import winston from 'winston';

class Logger {

   constructor() {

      this._winston = new (winston.Logger)({
         transports: [
            new (winston.transports.Console)()
         ]
      });
   }

   get logStream() {

      return {
         write: (message, encoding) => {
            this.info('[REQUEST] ' + message.replace('\n', ''));
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

export default new Logger();