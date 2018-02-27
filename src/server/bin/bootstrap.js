import { BasicStrategy } from 'passport-http';

// Custom dependencies bootstrapper / registrar.
export default (config, logger) => {

  const basicStrategy = new BasicStrategy((userId, password, done) => {

    console.log(userId);

    done();
  });

  const dependencies = new Map();

  dependencies.set('authStrategies', [basicStrategy]);

  return dependencies;
};