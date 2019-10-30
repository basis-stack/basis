import passport from 'passport';

export default (app, container) => {

  const authStrategies = container.resolve(container.instanceKeys.authStrategies);

  // TODO: Need to log a warning here if 'authStrategies' doesn't exist in the container

  authStrategies.forEach(s => { passport.use(s); });
  app.use(passport.initialize());

  // TODO: Add session support here passport.session()

  return passport;
};