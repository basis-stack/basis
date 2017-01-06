import jsonfile from 'jsonfile';

// TODO: Do we even need this class...or do we just export the settings json as is ?
export class Config {

   constructor(settings) {

      this._settings = settings;
   }

   // TODO: Make these getter props generic using js [] gear
   get appName() {

      return this._settings.appName;
   }

   get env() {

      return this._settings.envName;
   }

   get logPath() {

      return this._settings.logPath;
   }

   get webServerPort() {

      return this._settings.webServerPort;
   }
}

// TODO: Need to check if settings file exists, otherwise throw startuup error !!
export default new Config(jsonfile.readFileSync(`${__dirname}/../../settings.json`));