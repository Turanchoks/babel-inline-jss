import React from 'react';
import { render } from 'react-dom';

const path = theme => theme.button;

const Component = () => {
  const classes = __jss(path);
  return React.createElement('button', { className: classes.button });
};

render(
  React.createElement(Component, null, 'Test'),
  document.getElementById('root')
);
