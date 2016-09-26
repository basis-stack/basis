class Container {

   constructor() {

      this._instanceMap = new Map();
   }

   initialise() {

      this._instanceMap.clear();
   }

   register(key, instance) {

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