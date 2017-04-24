import _ from 'lodash';

export const createStubObject = (methods) => {

  const targetMembers = _.isString(methods) ? [methods] : methods;
  const stubObject = {};

  targetMembers.forEach((m) => {
    stubObject[m] = () => {};
  });

  return stubObject;
}

export const getStubContainer = (stubConfig, stubLogger) => {

  return {
    resolve: (key) => {
      // TODO: Can this switching be done using sinon alone ? withArgs or similar ?
      if (key === 'config') { return stubConfig; }
      if (key === 'logger') { return stubLogger; }
    },
    keys: { config: 'config', logger: 'logger' }
  };
};

export const getStubRouter = () => {

  return createStubObject('get');
}

export const getStubResponse = () => {

  return createStubObject(['status', 'send', 'render']);
}