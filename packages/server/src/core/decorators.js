import 'reflect-metadata';

import bindRoutes from './../middleware/routeBinder';

const defaultPath = '';

const httpMethodDecorator = (method, path) => (

  (target, property, descriptor) => {

    Reflect.defineMetadata('http:method', method, target, property);
    Reflect.defineMetadata('http:path', path, target, property);
  }
);

// TODO: Add Authenticated class decorator here

export const Controller = rootPath => (

  (target) => {

    Reflect.defineMetadata('http:rootPath', rootPath, target);

    target.initialise = (router, container) => {

      const instance = new target(container);
      bindRoutes(target, instance, router);

      return instance;
    };
  }
);

export const Get = (path = defaultPath) => httpMethodDecorator('get', path);
export const Post = (path = defaultPath) => httpMethodDecorator('post', path);

// TODO: Add Put, Delete, etc here