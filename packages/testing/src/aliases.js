function mochaDescribe(prefix, title, contents) {

  return describe(`${prefix} ${title}`, contents);
}

function mochaIt(prefix, title, contents) {

  return it(`${prefix} ${title}`, contents);
}

const aliasTypes = {
  the: 'The',
  should: 'should',
  when: 'when',
  withScenario: 'with'
};

export function the(title, contents) {

  return mochaDescribe(aliasTypes.the, title, contents);
}

export function should(title, contents) {

  return mochaIt(aliasTypes.should, title, contents);
}

export function when(title, contents) {

  return mochaDescribe(aliasTypes.when, title, contents);
}

export function withScenario(title, contents) {

  return mochaDescribe(aliasTypes.withScenario, title, contents);
}