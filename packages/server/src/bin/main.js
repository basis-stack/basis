import getContainer from '../core/container';
import getModules from '../core/moduleLoader';
import startHttpServer from './httpServer';
import startSocketServer from './socketServer';

export default testModules => {

  // TODO: Should we wrap all this in a try catch to gracefully handle any server start errors ??

  const container = getContainer().initialise();
  const modules = testModules !== undefined ? testModules : getModules(container);
  const routes = modules.filter(m => m.initRoutes !== undefined)
                        .map(m => ({ moduleKey: m.key, init: m.initRoutes }));

  const httpServer = startHttpServer(container, routes);

  const channels = modules.filter(m => m.initChannels !== undefined)
                          .map(m => ({ moduleKey: m.key, init: m.initChannels }));

  if (channels.length > 0) {

    startSocketServer(container, httpServer, channels);
  }
};