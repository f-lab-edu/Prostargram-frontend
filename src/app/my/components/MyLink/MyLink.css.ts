import { responsiveStyle } from '@/styles/styles.css';
import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const iconWithLinkWrapper = style([
  responsiveStyle({ desktop: { display: 'flex', gap: 5 } }),
]);

export const myLink = style([
  responsiveStyle({ desktop: { fontSize: vars.font['body-14'].fontSize } }),
]);
