import { responsiveStyle } from '@styles/styles.css';
import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const fieldContainer = style({
  width: '100%',
  marginBottom: 20,
});

export const label = style({
  display: 'inline-block',
  marginBottom: 5,
  fontSize: vars.font['body-14'].fontSize,
  color: vars.colors['gray-2'],
  cursor: 'default',
});

export const emphasize = style({
  color: vars.colors.red,
});

export const fieldBox = style([
  { display: 'flex', flexDirection: 'column', gap: '10px' },
  responsiveStyle({ desktop: { flexDirection: 'row' } }),
]);

export const errorMessage = style({
  display: 'flex',
  gap: 5,
  marginTop: 5,
});
