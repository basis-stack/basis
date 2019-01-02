import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export default (history, reducers) => combineReducers({
  router: connectRouter(history),
  ...reducers
});