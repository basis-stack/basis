export default (modules) => {

  const reducers = {};

  modules.filter(m => m.config.reducers !== undefined)
         .forEach((m) => {

           reducers[m.config.key] = m.config.reducers;
         });

  return {
    reducers,
    routes: modules.filter(m => m.config.route !== undefined)
                   .map(m => m.config.route)
  };
};