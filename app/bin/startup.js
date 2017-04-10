import { default as getContainer } from './../core/container';
import { default as startServer } from './server';

function main() {

  // TODO: Wrap this in a try catch to gracefully handle any server start errors
  startServer(getContainer().initialise());
}

if (process.env.BABEL_ENV === 'test') {
  module.exports.main = main;
} else {
  main();
}