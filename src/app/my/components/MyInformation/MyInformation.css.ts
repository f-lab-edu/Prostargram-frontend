import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { responsiveStyle } from '@/styles/styles.css';

export const nickname = style([
  responsiveStyle({
    desktop: {
      fontSize: vars.font['bold-32'].fontSize,
      fontWeight: vars.font['bold-32'].fontWeight,
    },
  }),
]);

export const currentState = style([
  responsiveStyle({
    desktop: {
      fontWeight: vars.font['bold-16'].fontWeight,
      marginBottom: '1.25rem',
    },
  }),
]);

export const description = style([
  responsiveStyle({
    desktop: {
      fontSize: vars.font['body-14'].fontSize,
    },
  }),
]);
