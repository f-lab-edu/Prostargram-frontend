import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { responsiveStyle } from '@/styles/styles.css';

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

export const myLink = style([
  responsiveStyle({
    desktop: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 10,
      fontSize: vars.font['body-14'].fontSize,
      gap: 10,
    },
  }),
]);
