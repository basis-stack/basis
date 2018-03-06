import 'reflect-metadata';

export default (controllerClass, controllerInstance, router, passport) => {

  const baseRoute = Reflect.getMetadata('http:rootPath', controllerClass);
  const authenticate = Reflect.hasMetadata('http:authenticate', controllerClass);
  const methods = Object.getOwnPropertyNames(controllerClass.prototype)
                        .filter(m => m !== 'constructor' && Reflect.hasMetadata('http:path', controllerInstance, m));

  methods.forEach((name) => {

    const specificPath = Reflect.getMetadata('http:path', controllerInstance, name);
    const httpMethod = Reflect.getMetadata('http:method', controllerInstance, name);
    const route = `${baseRoute}/${specificPath}`.replace('//', '/');
    const handler = controllerInstance[name].bind(controllerInstance);

    // TODO: Test this branch !!
    if (authenticate) {

      const strategy = Reflect.getMetadata('http:authStrategy', controllerClass);
      const options = Reflect.getMetadata('http:authOptions', controllerClass);

      router[httpMethod](route, passport.authenticate(strategy, options), handler);
    } else {

      router[httpMethod](route, handler);
    }
  });
};