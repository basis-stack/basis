import _ from 'lodash';

// TODO: Add properties in here also
export const createStubObject = methods => {

  const targetMembers = _.isString(methods) ? [methods] : methods;
  const stubObject = {};

  targetMembers.forEach(m => { stubObject[m] = () => {}; });

  return stubObject;
};

export const getStubContainer = (stubConfig, stubLogger) => {

  const configKey = 'config';
  const loggerKey = 'logger';

  return {
    resolve: key => {
      // TODO: Can this switching be done using sinon alone ? withArgs or similar ?
      if (key === configKey) { return stubConfig; }
      if (key === loggerKey) { return stubLogger; }

      return undefined;
    },
    instanceKeys: { config: configKey, logger: loggerKey }
  };
};

export const getStubRouter = () => createStubObject(['get', 'post']);
export const getStubResponse = () => createStubObject(['status', 'send', 'render']);
export const getStubApp = () => createStubObject(['use', 'enable', 'set']);
export const getStubLogger = () => createStubObject(['info', 'error', 'warn']);