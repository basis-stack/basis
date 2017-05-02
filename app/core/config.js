import jsonfile from 'jsonfile';

export default class Config {

  constructor(settings) {

    Object.keys(settings)
          .forEach((prop) => { this[prop] = settings[prop]; });
  }

  static createFromSettingsFile(filePath) {

    // TODO: Align this with the new settings structure !!
    //       Need to peak at NODE_ENV variable and see it is set.
    //       If set, create a new config instance from settings for that env.
    //
    //       const env = getEnvironmentVariable('NODE_ENV', 'local');
    //
    //       const settings = jsonfile.readFileSync(filePath)[env];

    // TODO Also: Need to check if the settings file actually exists. And what if not ? Throw ? Start with some arbitary defaults (port, etc) ?

    return new Config(jsonfile.readFileSync(filePath));
  }
}