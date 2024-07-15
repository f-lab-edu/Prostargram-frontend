import { style } from '@vanilla-extract/css';

import { responsiveStyle } from '@/styles/styles.css';

export const myLinkContainer = style([
  responsiveStyle({ desktop: { flex: 1, display: 'flex', gap: '2.5rem' } }),
]);

export const iconWithMyLinkWrapper = style([
  responsiveStyle({
    desktop: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 10,
    },
  }),
]);

export const editButtonWrapper = style([
  responsiveStyle({
    desktop: { display: 'flex', alignItems: 'center', gap: 10 },
  }),
]);

export const editButton = style([
  responsiveStyle({ desktop: { width: '3.25rem' } }),
]);
