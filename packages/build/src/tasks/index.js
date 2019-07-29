import assetTasks from './assets';
import buildTasks from './build';
import cleanTasks from './clean';
import clientTasks from './client';
import createTasks from './create';
import lintTasks from './lint';
import packagesTasks from '../packages';
import serverTasks from './server';
// import publishTasks from './publish';

// TODO: This master list is placed in correct order due to Gulp 4 requirements
// (i.e. that series / parallel require dependencies to be already registered).
// Fix this with smart sort (based on # dependencies) so that this master list can be moree extensible
export default [
  cleanTasks, lintTasks, assetTasks, clientTasks, createTasks,
  serverTasks, packagesTasks, buildTasks /* publishTasks */
];