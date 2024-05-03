import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { flexCenter } from '@/styles/common.css';
import { responsiveStyle } from '@/styles/styles.css';

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

export const feed = style([
  flexCenter,
  borderBlack,
  responsiveStyle({
    desktop: {
      flexDirection: 'column',
      width: '18.75rem',
      borderBottom: '1px solid',
      borderRight: '1px solid',
    },
  }),
]);
