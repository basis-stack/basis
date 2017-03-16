function mochaDescribe(prefix, title, contents) {

  return describe(`${prefix} ${title}`, contents);
}

function mochaIt(prefix, title, contents) {

  const prefixText = prefix !== '' ? `${prefix} ` : '';

  return it(`${prefixText}${title}`, contents);
}

export const aliasTypes = {
  a: 'A',
  and: 'and',
  the: 'The',
  should: 'should',
  then: 'then',
  when: 'when',
  withScenario: 'with'
};

export function a(title, contents) {

  return mochaDescribe(aliasTypes.a, title, contents);
}

export function the(title, contents) {

  return mochaDescribe(aliasTypes.the, title, contents);
}

export function when(title, contents) {

  return mochaDescribe(aliasTypes.when, title, contents);
}

export function withScenario(title, contents) {

  return mochaDescribe(aliasTypes.withScenario, title, contents);
}

export function then(title, contents) {

  return mochaIt('', title, contents);
}

export function should(...args) {

  if (args.length === 1) {
    return mochaDescribe(aliasTypes.should, '', args[0]);
  } else {
    return mochaIt(aliasTypes.should, args[0], args[1]);
  }
}

export function and(title, contents, leadingAlias = aliasTypes.then) {

  return mochaIt('', title, contents);
}