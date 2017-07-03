import Config from './config';
import Logger from './logger';

class Container {

  constructor() {

    this._instanceMap = new Map();
    this._settingsFilePath = `${__dirname}/../config/settings.json`;

    this.instanceKeys = {};
  }

  initialise() {

    this._instanceMap.clear();

    const config = Config.createFromSettingsFile(this._settingsFilePath);

    this.register('config', config);
    this.register('logger', Logger.createFromConfig(config));

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