import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { responsiveStyle } from '@/styles/styles.css';

const flexCenter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const borderBlack = style({
  borderColor: vars.colors['gray-3'],
});

export const textBlue = style([
  responsiveStyle({
    desktop: {
      color: vars.colors['primary-2'],
      fontSize: vars.font['body-28'].fontSize,
      cursor: 'pointer',
      ':hover': {
        color: vars.colors['primary-1'],
        textDecoration: 'underline',
      },
    },
  }),
]);

export const follow = style([
  flexCenter,
  borderBlack,
  responsiveStyle({
    desktop: {
      flex: 1,
      flexDirection: 'column',
      height: '7.75rem',
      borderRight: '1px solid',
    },
  }),
]);
