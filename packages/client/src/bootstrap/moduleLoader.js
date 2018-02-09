export default (modules) => {

  const reducers = {};

  modules.filter(m => m.reducers !== undefined)
         .forEach((m) => {

           reducers[m.key] = m.reducers;
         });

  return {
    reducers,
    routes: modules.filter(m => m.route !== undefined)
                   .map(m => m.route)
  };
};