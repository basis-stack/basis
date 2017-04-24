import { expect } from 'chai';

export const assertWasCalled = (spy, parameter = undefined) => {

  expect(spy.calledOnce).to.equal(true);

  if (parameter !== undefined) {
    expect(spy.calledWithExactly(parameter)).to.equal(true);
  }
}

export const assertParameter = (spy, parameterIndex, expectedValue, deepCompare = false) => {

  const parameter = spy.args[0][parameterIndex];

  if (deepCompare) {
    expect(parameter).to.deep.equal(expectedValue);
  } else {
    expect(parameter).to.equal(expectedValue);
  }
}

export const assertCalledBefore = (spyA, spyB, methodA, methodB) => {

  const message = `Expected ${methodA} to be called before ${methodB}`;

  expect(spyA.calledBefore(spyB)).to.equal(true, message);
}