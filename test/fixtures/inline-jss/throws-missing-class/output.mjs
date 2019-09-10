import React from 'react';
import { render } from 'react-dom';

const Component = () => {
  return React.createElement('button', {
    className: "button-0-1-5"
  });
};

render(React.createElement(Component, null, 'Test'), document.getElementById('root'));

__attachStyles(".button-0-1-5 {\n  font-size: 32px;\n  background: yellow;\n}")
