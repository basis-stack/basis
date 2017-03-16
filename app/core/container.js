import { Config } from './config';
import { Logger } from './logger';

class Container {

  constructor() {

    this._instanceMap = new Map();
    this.keys = {};
  }

  initialise(initialiseCoreServices = true) {

    this._instanceMap.clear();

    if (initialiseCoreServices) {

      const config = new Config();

      this.register('config', config);
      this.register('logger', new Logger(config));
    }
  }

  register(key, instance) {

    this.keys[key] = key;
    this._instanceMap.set(key, instance);
  }

  resolve(key) {

    if (!this._instanceMap.has(key)) {
      throw new Error(`[CONTAINER]: Unable to resolve instance. Key '${key}' not found.`);
    }

    return this._instanceMap.get(key);
  }
}

export default new Container();