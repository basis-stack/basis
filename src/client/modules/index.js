import core from './core';

const allModules = [core];
const moduleReducers = {};

allModules.filter(m => m.reducers !== undefined)
          .forEach((m) => {

            moduleReducers[m.key] = m.reducers;
          });

export const reducers = moduleReducers;
export const routes = allModules.filter(m => m.route !== undefined)
                                .map(m => m.route);
