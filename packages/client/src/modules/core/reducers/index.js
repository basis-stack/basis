import * as actionTypes from './../constants/actionTypes';

const initialState = {

  config: undefined,
  // TODO: Get this from (build) config somehow (import from temp ??)
  theme: {
    primary: '#2196F3',
    secondary: '#ffc400',
    appBar: '#1976D2'
  }
};

export default (state = initialState, action) => {

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