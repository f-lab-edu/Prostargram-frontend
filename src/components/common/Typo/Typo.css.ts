import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

const colorSet = Object.fromEntries(
  Object.entries(vars.colors).map(([fontColor, value]) => [
    [fontColor],
    { color: value },
  ]),
);

const typoDefaultStyle = style({
  width: '100%',
});

export const typography = recipe({
  base: typoDefaultStyle,
  variants: {
    fontSize: vars.font,
    color: colorSet,
    textDecoration: {
      underline: {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
  },
});
