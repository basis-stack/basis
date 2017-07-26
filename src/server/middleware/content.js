import compression from 'compression';
import express from 'express';
import path from 'path';

export default (app) => {

  // TODO: Add a check for PROD env, and don't use compression if so (as Nginx will more efficiently do in prod envs)
  app.use(compression());

  // TODO: Add a check for PROD env, and don't serve (public) as static (as Nginx will more efficiently do in prod envs)
  app.use(express.static(path.join(__dirname, '../public')));
};