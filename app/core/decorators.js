import 'reflect-metadata';

const httpMethodDecorator = (method, path) => (

  (target, property, descriptor) => {

    Reflect.defineMetadata('http:method', method, target, property);
    Reflect.defineMetadata('http:path', path, target, property);
  }
);

export const Controller = rootPath => (

  (target) => {

    Reflect.defineMetadata('http:rootPath', rootPath, target);
  }
);

export const Get = path => httpMethodDecorator('get', path);
export const Post = path => httpMethodDecorator('post', path);