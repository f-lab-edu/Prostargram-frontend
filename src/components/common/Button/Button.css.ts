import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

import { responsiveStyle } from '@styles/styles.css';
import { vars } from '@styles/theme.css';

const defaultButtonStyle = style([
  {
    width: '100%',
    borderRadius: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'pointer',
    transition: '0.1s filter',
  },
  responsiveStyle({}),
]);

const makeButtonStyle = (color: keyof typeof vars.colors) => ({
  backgroundColor: vars.colors[color],
  color: vars.colors.white,
  ':hover': {
    filter: 'brightness(115%)',
  },
  ':active': {
    filter: 'brightness(85%)',
  },
});

export const buttonStyle = recipe({
  variants: {
    size: {
      small: { height: '38px' },
      medium: { height: '45px' },
      large: style([
        { height: '38px', fontSize: vars.font['body-14'].fontSize },
        responsiveStyle({
          desktop: { height: '48px', fontSize: vars.font['body-16'].fontSize },
        }),
      ]),
    },
    fill: {
      blue: [defaultButtonStyle, makeButtonStyle('primary-1')],
      gray: [defaultButtonStyle, makeButtonStyle('gray-2')],
      red: [defaultButtonStyle, makeButtonStyle('red')],
    },
    disabled: {
      true: [
        {
          ':active': { filter: 'none' },
          ':hover': { filter: 'none' },
          ':disabled': {
            backgroundColor: vars.colors['gray-6'],
            cursor: 'default',
          },
        },
      ],
    },
  },
});
