import jsonfile from 'jsonfile';

class Config {

   constructor() {

      this._settings = jsonfile.readFileSync(`${__dirname}/../../settings.json`);
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

export default new Config();