// Custom dependencies bootstrapper / registrar.
export default (config, logger) => {

  const dependencies = new Map();

  dependencies.set('authStrategies', []);

  return dependencies;
};