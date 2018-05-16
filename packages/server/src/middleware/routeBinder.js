import 'reflect-metadata';

export default (controllerClass, controllerInstance, router) => {

  const baseRoute = Reflect.getMetadata('http:rootPath', controllerClass);
  const baseMiddleware = Reflect.hasMetadata('http:middleware', controllerClass) ?
    Reflect.getMetadata('http:middleware', controllerClass) : [];
  const methods = Object.getOwnPropertyNames(controllerClass.prototype)
                        .filter(m => m !== 'constructor' && Reflect.hasMetadata('http:path', controllerInstance, m));

  methods.forEach((name) => {

    const specificPath = Reflect.getMetadata('http:path', controllerInstance, name);
    const specificMiddleware = Reflect.hasMetadata('http:middleware', controllerInstance, name) ?
      Reflect.getMetadata('http:middleware', controllerInstance, name) : [];
    const httpMethod = Reflect.getMetadata('http:method', controllerInstance, name);
    const route = `${baseRoute}/${specificPath}`.replace('//', '/');
    const handler = controllerInstance[name].bind(controllerInstance);

    // TODO: Test this branch !!
    if (baseMiddleware.length > 0 || specificMiddleware.length > 0) {

      const middleware = baseMiddleware.concat(specificMiddleware);
      router[httpMethod](route, ...middleware, handler);
    } else {

      router[httpMethod](route, handler);
    }
  });
};