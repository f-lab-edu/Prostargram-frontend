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

export const inputWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
});

export const orLine = style({
  width: '100%',
  position: 'relative',
  margin: '12px 0',
  textAlign: 'center',
});

export const horizontalLine = style({
  width: '100%',
  position: 'absolute',
  top: '50%',
  border: `1px solid ${vars.colors['gray-5']}`,
});

export const orSpan = style({
  color: vars.colors['gray-5'],
  position: 'relative',
  padding: '0 10px',
  background: vars.colors.white,
});
