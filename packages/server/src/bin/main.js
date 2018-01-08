import getContainer from './../core/container';
import getModules from './../core/moduleLoader';
import startHttpServer from './httpServer';
// import startSocketServer from './socketServer';

export default () => {

  // TODO: Should we wrap all this in a try catch to gracefully handle any server start errors ??

  const container = getContainer().initialise();
  const modules = getModules(container);
  const routes = modules.filter(m => m.initRoutes !== undefined)
                        .map(m => ({ moduleKey: m.key, init: m.initRoutes }));

  const httpServer = startHttpServer(container, routes);

  // const channels = modules.filter(m => m.initRoutes !== undefined)
  //                       .map(m => ({ moduleKey: m.key, init: m.initRoutes }));

  // startSocketServer(container, httpServer);
};