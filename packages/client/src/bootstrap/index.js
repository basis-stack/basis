import moduleLoader from './moduleLoader';
import appWrapper from './appWrapper';
import mount from './mount';

export default (modules, app) => {

  const moduleData = moduleLoader(modules);
  const App = appWrapper(app, moduleData);

  mount(App);
};