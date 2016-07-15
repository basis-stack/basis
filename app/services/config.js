import jsonfile from 'jsonfile';

class Config {

   constructor() {

      this._settings = jsonfile.readFileSync(__dirname + '/../../settings.json');
   }

   // TODO: Make these getter props generic using js [] gear
   get env() {

      return this._settings.env;
   }

   get webServerPort() {

      return this._settings.webServerPort;
   }
}

export default new Config();