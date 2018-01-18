import * as actionTypes from './../constants/actionTypes';

const getInitialState = theme => ({

  config: undefined,
  theme
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

    default: {
      return state;
    }
  }
};