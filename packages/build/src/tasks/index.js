import assetTasks from './assets';
import buildTasks from './build';
import cleanTasks from './clean';
import clientTasks from './client';
import createTasks from './create';
import lintTasks from './lint';
import packagesTasks from './packages';
import serverTasks from './server';
// import publishTasks from './publish';

export default [
  assetTasks, buildTasks, cleanTasks, clientTasks,
  createTasks, lintTasks, packagesTasks, serverTasks /* publishTasks */
];