import loadModules from './moduleLoader';
import wrapApp from './appWrapper';
import mount from './mount';

export default (modules, app, themeConfig) => {

  const moduleData = loadModules(modules);
  const App = wrapApp(app, moduleData, themeConfig);

  mount(App);
};