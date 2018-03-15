import * as actionTypes from './../constants/actionTypes';

const initialState = {

  layout: {
    navDrawerOpen: false,
    drawerOpen: false
  }
};

export default (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.TOGGLE_NAV_DRAWER: {

      return {
        ...state,
        layout: { ...state.layout, navDrawerOpen: !state.layout.navDrawerOpen }
      };
    }

    case actionTypes.TOGGLE_DRAWER: {

      return {
        ...state,
        layout: { ...state.layout, drawerOpen: !state.layout.drawerOpen }
      };
    }

    default: {
      return state;
    }
  }
};