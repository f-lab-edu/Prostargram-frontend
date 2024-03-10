import { style } from '@vanilla-extract/css';

import { vars } from '@styles/theme.css';
import { responsiveStyle } from '@styles/styles.css';

export const container = style([
  {
    width: '100%',
    height: '100%',
    backgroundColor: vars.colors.white,
    padding: '50px 30px',
  },
  responsiveStyle({
    desktop: {
      padding: '100px',
    },
  }),
]);
