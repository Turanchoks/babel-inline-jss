import React from 'react';
import { render } from 'react-dom';

const Component = () => {
  const classes = __jss(theme => theme.button);
  return React.createElement('button', { className: classes.buttonWrong });
};

render(
  React.createElement(Component, null, 'Test'),
  document.getElementById('root')
);
