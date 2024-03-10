import { responsiveStyle } from '@styles/styles.css';
import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const link = style({
  display: 'block',
  textAlign: 'center',
});

export const logo = style([
  {
    position: 'relative',
    fontSize: vars.font['bold-32'].fontSize,
    fontWeight: vars.font['bold-32'].fontWeight,
    color: vars.colors['primary-1'],
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.25)',
    cursor: 'pointer',
  },
  responsiveStyle({
    desktop: {
      fontSize: 60,
    },
  }),
]);

export const github = style([
  {
    position: 'absolute',
    width: '1.875rem',
    height: '1.875rem',
    right: '-20px',
    top: '-10px',
    transform: 'rotate(30deg)',
  },
  responsiveStyle({
    desktop: {
      width: '4.375rem',
      height: '4.375rem',
      right: '-40px',
      top: '-30px',
    },
  }),
]);
