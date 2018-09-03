declare module 'basis-testing' {

  // TODO: Declare these as the functions they are !!

  // Aliases
  export const the: any;
  export const should: any;
  export const when: any;
  export const withScenario: any;

  // Fakes
  export const createStubObject: any;
  export const getStubContainer: any;
  export const getStubRouter: any;
  export const getStubResponse: any;
  export const getStubApp: any;
  export const getStubLogger: any;

  // Assertions
  export const assertWasCalled: any;
  export const assertParameter: any;
  export const assertCall: any;
  export const assertCalledBefore: any;
  export const assertInstance: any;

  // Module
  export const stubModule: any;
}