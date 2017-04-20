import { expect } from 'chai';

export const assertWasCalled = (spy, parameter = undefined) => {

  expect(spy.calledOnce).to.equal(true);

  if (parameter !== undefined) {
    expect(spy.calledWithExactly(parameter)).to.equal(true);
  }
}

export const assertParameter = (spy, parameterIndex, expectedValue) => {

  const parameter = spy.args[0][parameterIndex];

  expect(parameter).to.equal(expectedValue);
}

export const assertCalledBefore = (spyA, spyB, methodA, methodB) => {

  const message = `Expected ${methodA} to be called before ${methodB}`;

  expect(spyA.calledBefore(spyB)).to.equal(true, message);
}