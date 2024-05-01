import { style } from '@vanilla-extract/css';

import { responsiveStyle } from '@/styles/styles.css';

export const removeLinkButton = style([
  {
    display: 'flex',
    width: '1rem',
    cursor: 'pointer',
  },
  responsiveStyle({
    desktop: {
      width: '1.5rem',
    },
  }),
]);

export const removeIcon = style({
  width: '100%',
});
