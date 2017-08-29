import getContainer from './../core/container';
import startServer from './server';

export default () => {

  // TODO: Wrap this in a try catch to gracefully handle any server start errors
  startServer(getContainer().initialise());
};