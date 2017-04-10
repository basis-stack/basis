import jsonfile from 'jsonfile';

export class Config {

  constructor(settings) {

    for (const prop in settings) {
      this[prop] = settings[prop];
    }
  }

  static createFromSettingsFile(filePath) {

    return new Config(jsonfile.readFileSync(filePath));
  }
}