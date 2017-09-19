import jsonfile from 'jsonfile';
import assignDeep from 'object-assign-deep';
import path from 'path';

import constants from './constants';
import { getEnvVariable, getRootPath } from './utilities';

export default class Config {

  constructor(settings) {

    Object.keys(settings)
          .forEach((prop) => { this[prop] = settings[prop]; });
  }

  static getAppVersion() {

    return jsonfile.readFileSync(path.join(getRootPath(), 'package.json'))
                   .version;
  }

  static createFromSettingsFile(filePath) {

    const defaultEnv = 'local';
    const runtimeEnv = getEnvVariable(constants.env.variables.node, defaultEnv);
    const allSettings = jsonfile.readFileSync(filePath);
    const version = Config.getAppVersion();

    if (allSettings[runtimeEnv] === undefined) {

      throw new Error(`Unable to bootstrap for environment: '${runtimeEnv}'. No settings found in settings file for this environment.`);
    }

    return new Config(assignDeep({}, allSettings.default, allSettings[runtimeEnv], { shared: { env: runtimeEnv, version } }));
  }
}