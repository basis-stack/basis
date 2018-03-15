import * as actionTypes from './../constants/actionTypes';

const createAction = type => ({ type });

export const toggleNavDrawer = () => createAction(actionTypes.TOGGLE_NAV_DRAWER);
export const toggleDrawer = () => createAction(actionTypes.TOGGLE_DRAWER);
export { default as fetchConfig } from './fetchConfig';