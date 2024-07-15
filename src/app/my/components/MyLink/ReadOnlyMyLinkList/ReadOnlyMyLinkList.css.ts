import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { responsiveStyle } from '@/styles/styles.css';

export const myLink = style([
  responsiveStyle({
    desktop: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 10,
      fontSize: vars.font['body-14'].fontSize,
      gap: 10,
      cursor: 'pointer',
    },
  }),
]);
