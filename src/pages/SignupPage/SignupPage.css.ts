import { responsiveStyle } from '@styles/styles.css';
import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

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

export const logoBox = style({
  textAlign: 'center',
  marginBottom: 40,
});

export const form = style([
  {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  responsiveStyle({
    desktop: {},
  }),
]);

export const button = style([
  {},
  responsiveStyle({ desktop: { flex: 1, minWidth: 100 } }),
]);

export const nextButton = style([
  { marginTop: 60 },
  responsiveStyle({ desktop: { marginTop: 70 } }),
]);
