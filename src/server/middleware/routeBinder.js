import 'reflect-metadata';

export default (controllerClass, controllerInstance, router) => {

  const baseRoute = Reflect.getMetadata('http:rootPath', controllerClass);
  const methods = Object.getOwnPropertyNames(controllerClass.prototype)
                        .filter(m => m !== 'constructor' && Reflect.hasMetadata('http:path', controllerInstance, m));

  methods.forEach((name) => {

    const specificPath = Reflect.getMetadata('http:path', controllerInstance, name);
    const httpMethod = Reflect.getMetadata('http:method', controllerInstance, name);
    const route = `${baseRoute}/${specificPath}`.replace('//', '/');

    router[httpMethod](route, controllerInstance[name]);
  });
};