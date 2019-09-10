import { create as createJss } from 'jss';
import preset from 'jss-preset-default';

export const jss = createJss();
jss.setup(preset());

export const theme = {
  button: {
    button: {
      fontSize: 32,
      background: 'yellow',
    },
  },
};

const __jss = path => {
  const styles = path(theme);
  const sheet = jss.createStyleSheet(styles).attach();
  return sheet.classes;
};

global.__jss = __jss;
