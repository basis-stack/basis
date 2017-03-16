import jsonfile from 'jsonfile';

export class Config {

  constructor(settings = Config._getSettingsFromFile()) {

    for (const prop in settings) {
      this[prop] = settings[prop];
    }
  }

  static _getSettingsFromFile() {

    return jsonfile.readFileSync(`${__dirname}/../../settings.json`);
  }
}