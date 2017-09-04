import jsonfile from 'jsonfile';
import assignDeep from 'object-assign-deep';

import constants from './constants';
import { getEnvVariable } from './utilities';

export default class Config {

  constructor(settings) {

    Object.keys(settings)
          .forEach((prop) => { this[prop] = settings[prop]; });
  }

  static createFromSettingsFile(filePath) {

    const defaultEnv = 'local';
    const runtimeEnv = getEnvVariable(constants.env.variables.node, defaultEnv);
    const allSettings = jsonfile.readFileSync(filePath);

    if (allSettings[runtimeEnv] === undefined) {

      throw new Error(`Unable to bootstrap for environment: '${runtimeEnv}'. No settings found in settings file for this environment.`);
    }

    return new Config(assignDeep({}, allSettings.default, allSettings[runtimeEnv], { shared: { env: runtimeEnv } }));
  }
}