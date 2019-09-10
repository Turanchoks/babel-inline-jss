import React from 'react';
import { render } from 'react-dom';

const factory = () => {
  const Component = () => {
    return React.createElement('button', {
      className: "button-0-1-2"
    });
  };
};

const Component = factory();
render(React.createElement(Component, null, 'Test'), document.getElementById('root'));

__attachStyles(".button-0-1-2 {\n  font-size: 32px;\n  background: yellow;\n}")
