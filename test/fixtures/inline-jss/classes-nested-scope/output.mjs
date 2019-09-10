import React from 'react';
import { render } from 'react-dom';

const Component = () => {
  React.useEffect(() => {
    const classes = {
      a: 2
    };
    console.log(classes.a);
  }, []);
  return React.createElement('button', {
    className: "button-0-1-1"
  });
};

render(React.createElement(Component, null, 'Test'), document.getElementById('root'));

__attachStyles(".button-0-1-1 {\n  font-size: 32px;\n  background: yellow;\n}")
