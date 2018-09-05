import * as actionTypes from '../constants/actionTypes';

const getInitialState = theme => ({

  config: undefined,
  theme,
  isBusy: false
});

export default theme => (state = getInitialState(theme), action) => {

  switch (action.type) {

    case actionTypes.INITIALISE: {

      return {
        ...state,
        config: action.config
      };
    }

    case actionTypes.CHANGE_THEME: {

      return {
        ...state,
        theme: action.theme
      };
    }

    case actionTypes.TOGGLE_BUSY: {

      return {
        ...state,
        isBusy: !state.isBusy
      };
    }

    default: {
      return state;
    }
  }
};