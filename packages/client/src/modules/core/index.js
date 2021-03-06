import actions from './actions';
import getReducers from './reducers';

export default {
  actions,
  initialise: theme => ({

    key: 'core',
    route: undefined,
    reducers: getReducers(theme)
  })
};