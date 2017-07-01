import 'reflect-metadata';

export default (controllerClass, controllerInstance, router) => {

  const baseRoute = Reflect.getMetadata('http:rootPath', controllerClass);

  // TODO: Filter out any methods that do not have metadata attached (e.g. private methods, etc)
  const methods = Object.getOwnPropertyNames(controllerClass.prototype)
                        .filter(m => m !== 'constructor');

  methods.forEach((name) => {

    const specificPath = Reflect.getMetadata('http:path', controllerInstance, name);
    const httpMethod = Reflect.getMetadata('http:method', controllerInstance, name);
    const route = `${baseRoute}/${specificPath}`.replace('//', '/');

    router[httpMethod](route, controllerInstance[name]);
  });
};