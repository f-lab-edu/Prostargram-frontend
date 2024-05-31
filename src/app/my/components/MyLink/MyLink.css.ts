import { style } from '@vanilla-extract/css';

import { responsiveStyle } from '@/styles/styles.css';

export const myLinkContainer = style([
  responsiveStyle({ desktop: { flex: 1, display: 'flex', gap: '2.5rem' } }),
]);
