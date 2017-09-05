import path from 'path';

import constants from './constants';
import { getRootPath, dynamicImport } from './utilities';
import Config from './config';
import Logger from './logger';

class Container {

  constructor() {

    this._instanceMap = new Map();
    this._settingsFilePath = path.join(getRootPath(), 'config/settings.json');

    this.instanceKeys = {};
  }

  initialise() {

    this._instanceMap.clear();

    const config = Config.createFromSettingsFile(this._settingsFilePath);
    const logger = Logger.createFromConfig(config);

    this.register('config', config);
    this.register('logger', logger);

    try {

      const bootstrap = dynamicImport('./bin/bootstrap').default;
      const customDependencies = bootstrap(config, logger);

      customDependencies.forEach((v, k) => { this.register(k, v); });

    } catch (err) {

      logger.warn(`${constants.text.logging.startupPrefix} INVALID_BOOTSTRAP: unable to initialise custom dependencies in ./bin/bootstrap. Error: ${err.message}`);
    }

    return this;
  }

  register(key, instance) {

    this.instanceKeys[key] = key;
    this._instanceMap.set(key, instance);
  }

  resolve(key) {

    if (!this._instanceMap.has(key)) {
      throw new Error(`[CONTAINER]: unable to resolve instance. Key '${key}' not found.`);
    }

    return this._instanceMap.get(key);
  }
}

export default () => new Container();