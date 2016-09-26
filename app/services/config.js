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