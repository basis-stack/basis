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