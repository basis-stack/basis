import { routeTypes } from 'basis-client';

import reducers from './reducers';
import Shell from './components/shell';

export default {

  actions: undefined,
  initialise: () => ({

    key: 'shell',
    route: {
      path: '/',
      component: Shell,
      type: routeTypes.shellHub
    },
    reducers
  })
};