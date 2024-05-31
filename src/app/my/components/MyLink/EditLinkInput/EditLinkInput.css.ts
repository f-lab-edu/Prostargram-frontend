import { style } from '@vanilla-extract/css';

import { responsiveStyle } from '@/styles/styles.css';

export const editLinkInputWrapper = style([
  responsiveStyle({
    desktop: {
      display: 'flex',
      height: '2.25rem',
    },
  }),
]);
