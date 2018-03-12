import 'reflect-metadata';

import bindRoutes from './../middleware/routeBinder';

const defaultPath = '';

const httpMethodDecorator = (method, path) => (

  (target, property, descriptor) => {

    Reflect.defineMetadata('http:method', method, target, property);
    Reflect.defineMetadata('http:path', path, target, property);
  }
);

const middlewareDecorator = middleware => (

  (target, property, descriptor) => {

    if (property !== undefined) {

      Reflect.defineMetadata('http:middleware', middleware, target, property);
    } else {

      Reflect.defineMetadata('http:middleware', middleware, target);
    }
  }
);

export const Authenticate = (strategy, options) => (target) => {

  Reflect.defineMetadata('http:authenticate', true, target);
  Reflect.defineMetadata('http:authStrategy', strategy, target);
  Reflect.defineMetadata('http:authOptions', options, target);
};

export const Controller = rootPath => (

  (target) => {

    Reflect.defineMetadata('http:rootPath', rootPath, target);

    target.initialise = (router, container, passport) => {

      const instance = new target(container);
      bindRoutes(target, instance, router, passport);

      return instance;
    };
  }
);

export const Get = (path = defaultPath) => httpMethodDecorator('get', path);
export const Head = (path = defaultPath) => httpMethodDecorator('head', path);
export const Post = (path = defaultPath) => httpMethodDecorator('post', path);
export const Put = (path = defaultPath) => httpMethodDecorator('put', path);
export const Delete = (path = defaultPath) => httpMethodDecorator('delete', path);
export const Options = (path = defaultPath) => httpMethodDecorator('options', path);

export const Middleware = middleware => middlewareDecorator(middleware);