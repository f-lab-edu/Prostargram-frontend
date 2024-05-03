import { style } from '@vanilla-extract/css';

import { responsiveStyle } from '@/styles/styles.css';
import { vars } from '@/styles/theme.css';

export const container = style([
  responsiveStyle({
    desktop: {
      width: '66.875rem',
      border: '1px solid',
      borderColor: vars.colors['gray-3'],
      borderRadius: '10px',
      background: vars.colors.white,
      margin: '1.875rem auto',
      overflow: 'hidden',
    },
  }),
]);
