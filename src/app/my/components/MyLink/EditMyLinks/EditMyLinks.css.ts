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

export const myLinkInput = style([
  responsiveStyle({
    desktop: {
      flex: 1,
      margin: 0,
      padding: 0,
      fontSize: vars.font['body-14'].fontSize,
      borderBottom: '1px solid',
      borderColor: vars.colors['gray-3'],
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

export const removeButton = style([
  responsiveStyle({
    desktop: {
      width: '2rem',
      height: '2rem',
      padding: '1rem',
      fontSize: '0.75rem',
    },
  }),
]);
