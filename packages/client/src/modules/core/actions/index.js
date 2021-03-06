import { push } from 'connected-react-router';

import * as actionTypes from '../constants/actionTypes';

export default {
  changeTheme: theme => ({ type: actionTypes.CHANGE_THEME, theme }),
  initialise: config => ({ type: actionTypes.INITIALISE, config }),

  // TODO: Need to incorporate state / query string params here also !!
  navigate: path => push(path),

  toggleBusy: () => ({ type: actionTypes.TOGGLE_BUSY })
};