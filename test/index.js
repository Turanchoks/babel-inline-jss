import runFixtures from '@babel/helper-transform-fixture-test-runner';
import path from 'path';
import { jss, theme } from '../jss';

runFixtures(
  path.join(__dirname, 'fixtures'),
  'Inline JSS',
  {},
  {
    plugins: [
      [
        path.resolve(__dirname, '..', 'plugin'),
        {
          jss,
          theme,
          functionName: '__jss',
          attachStylesFunctionName: '__attachStyles',
        },
      ],
    ],
  },
  (taskOptions, task) => {
    if (task.title.startsWith('throws')) {
      taskOptions.throws = true;
    }
  }
);
