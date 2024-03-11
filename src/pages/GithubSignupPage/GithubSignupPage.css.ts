import { style } from '@vanilla-extract/css';

import { vars } from '@styles/theme.css';
import { responsiveStyle } from '@styles/styles.css';

export const container = style([
  {
    width: '100%',
    height: '100%',
    backgroundColor: vars.colors.white,
    padding: '50px 30px',
  },
  responsiveStyle({
    desktop: {
      padding: '100px',
    },
  }),
]);

export const form = style([
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '22.75rem',
  },
  responsiveStyle({
    desktop: {
      minHeight: '33rem',
    },
  }),
]);

export const subTitle = style([
  {
    fontSize: vars.font['bold-20'].fontSize,
    fontWeight: vars.font['bold-20'].fontWeight,
    marginTop: '2.5rem',
    marginBottom: '1.25rem',
  },
  responsiveStyle({
    desktop: { marginTop: '3.125rem', marginBottom: '1.5rem' },
  }),
]);

export const button = style(
  responsiveStyle({ desktop: { flex: 1, minWidth: 100 } }),
);

export const lastField = style([
  {
    marginBottom: '3.75rem',
  },
]);
