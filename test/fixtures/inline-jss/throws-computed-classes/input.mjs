import React from 'react';
import { render } from 'react-dom';

const Component = ({ prop }) => {
  const classes = __jss(theme => theme.button);
  return React.createElement('button', {
    className: classes[prop ? 'button' : 'blah'],
  });
};

render(
  React.createElement(Component, { prop: true }, 'Test'),
  document.getElementById('root')
);
