import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

export default reducers => combineReducers({
  ...reducers,
  router
});