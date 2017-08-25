import { expect } from 'chai';

// TODO: Get this to assert n numbers of parameters (in calledWithExactly) instead of just one.
//       This will allow the more concise use of assertWasCalled(a, b, c) instad of the 4 line assertParameter(n) variant
export const assertWasCalled = (spy, parameter = undefined) => {

  expect(spy.calledOnce).to.equal(true);

  if (parameter !== undefined) {
    expect(spy.calledWithExactly(parameter)).to.equal(true);
  }
};

export const assertParameter = (spy, parameterIndex, expectedValue, deepCompare = false) => {

  const parameter = spy.args[0][parameterIndex];

  if (deepCompare) {
    expect(parameter).to.deep.equal(expectedValue);
  } else {
    expect(parameter).to.equal(expectedValue);
  }
};

export const assertCall = (spy, callIndex, expectedValue) => {

  const parameter = spy.args[callIndex][0];

  expect(parameter).to.equal(expectedValue);
};

export const assertCalledBefore = (spyA, spyB, methodA, methodB) => {

  const message = `Expected ${methodA} to be called before ${methodB}`;

  expect(spyA.calledBefore(spyB)).to.equal(true, message);
};

export const assertInstance = (instance, type) => {

  expect(instance).to.not.be.undefined;
  expect(instance instanceof type).to.equal(true);
};