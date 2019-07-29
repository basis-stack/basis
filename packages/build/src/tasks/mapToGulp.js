import { parallel, series, task } from 'gulp';

export default (tasks) => {

  tasks.forEach((t) => {

    switch (true) {

      case t.sequence !== undefined: {

        task(t.key, series(...t.sequence));
        break;
      }

      case t.dependencies === undefined: {

        task(t.key, t.func);
        break;
      }

      case t.func === undefined: {

        task(t.key, parallel(...t.dependencies));
        break;
      }

      default: {

        // TODO: Is 'work' the correct term for this ??
        const workFuncName = `${t.key} (work)`;

        task(workFuncName, t.func);
        task(`${t.key}`, series(parallel(...t.dependencies), workFuncName));
        break;
      }
    }
  });
};