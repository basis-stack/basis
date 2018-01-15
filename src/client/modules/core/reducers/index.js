import * as actionTypes from './../constants/actionTypes';

const initialState = {

  config: undefined
};

export default (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.INITIALISE: {

      return {
        ...state,
        config: action.config
      };
    }

    default: {
      return state;
    }
  }
};