import 'reflect-metadata';

export default (controllerClass, controllerInstance, router) => {

  const baseRoute = Reflect.getMetadata('http:rootPath', controllerClass);
  const baseMiddleware = Reflect.getMetadata('http:middleware', controllerClass);
  const methods = Object.getOwnPropertyNames(controllerClass.prototype)
                        .filter(m => m !== 'constructor' && Reflect.hasMetadata('http:path', controllerInstance, m));

  methods.forEach((name) => {

    const specificPath = Reflect.getMetadata('http:path', controllerInstance, name);
    const specificMiddleware = Reflect.getMetadata('http:middleware', controllerInstance, name);
    const httpMethod = Reflect.getMetadata('http:method', controllerInstance, name);
    const route = `${baseRoute}/${specificPath}`.replace('//', '/');
    const handler = controllerInstance[name].bind(controllerInstance);

    // TODO: Test this branch !!
    if (baseMiddleware !== undefined || specificMiddleware !== undefined) {

      // TODO: Concatenate all specific middle to base if it inddeed exists
      const middleware = specificMiddleware !== undefined ? specificMiddleware : baseMiddleware;
      router[httpMethod](route, ...middleware, handler);
    } else {

      router[httpMethod](route, handler);
    }
  });
};