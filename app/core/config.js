import jsonfile from 'jsonfile';

export default class Config {

  constructor(settings) {

    Object.keys(settings)
          .forEach((prop) => { this[prop] = settings[prop]; });
  }

  static createFromSettingsFile(filePath) {

    return new Config(jsonfile.readFileSync(filePath));
  }
}