// TODO: Should these Keys / props be CAPS case ? So that the usage is CONSTANTS.ENV.VARIABLES.NODE ? Not sure. Need to check recommended style guides for this and have a think.
export default {
  text: {
    logging: {
      startupPrefix: '[STARTUP]',
      serverPrefix: '[SERVER ]'
    }
  },
  env: {
    variables: {
      node: 'NODE_ENV',
      babel: 'BABEL_ENV'
    }
  }
};