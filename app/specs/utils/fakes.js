// TODO: Turn methods into an array if only a single value
export const createStubObject = (methods) => {

  const stubObject = {};

  methods.forEach((m) => {
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

  return createStubObject(['get']);
}

export const getStubResponse = () => {

  return createStubObject(['send']);
}