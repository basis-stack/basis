import { push } from 'react-router-redux';

import * as actionTypes from './../constants/actionTypes';

export const initialise = config => ({ type: actionTypes.INITIALISE, config });

// TODO: Need to incorporate state here also !!
export const navigate = path => push(path);