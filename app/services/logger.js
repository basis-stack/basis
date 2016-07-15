import path from 'path';
import winston from 'winston';

import config from './config';

class Logger {

   constructor() {

      this._winston = new (winston.Logger)(this._getWinstonOptions());
   }

   get logStream() {

      return {
         write: (message, encoding) => {
            // TODO: Template string this !!!
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

   _getLogFilePath() {

      // TODO: Need to create the logPath dir if it doesn't yet exist !!!

      // TODO: Actually get logPath working and not erroring :/

      //return path.join(config.logPath, `${config.appName}-${config.env}.log`);
      return `${config.appName}-${config.env}.log`;
   }

   _getWinstonOptions() {

      const options = { transports: [] };

      if (config.env === 'local') {
         options.transports.push(new (winston.transports.Console)());
      } else {
         options.transports.push(new (winston.transports.File)({ filename: this._getLogFilePath() }));
      }

      return options;
   }
}

export default new Logger();