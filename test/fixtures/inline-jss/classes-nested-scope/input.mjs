import React from 'react';
import { render } from 'react-dom';

const Component = () => {
  const classes = __jss(theme => theme.button);
  React.useEffect(() => {
    const classes = {
      a: 2,
    };
    console.log(classes.a);
  }, []);

  return React.createElement('button', { className: classes.button });
};

render(
  React.createElement(Component, null, 'Test'),
  document.getElementById('root')
);
