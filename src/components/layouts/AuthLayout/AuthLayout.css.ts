import { responsiveStyle } from '@styles/styles.css';
import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

const flexCenter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const container = style([
  flexCenter,
  {
    width: '100%',
    height: '100%',
    backgroundColor: vars.colors['gray-9'],
  },
]);

export const innerContainer = style([
  {
    width: '100%',
    minWidth: 290,
    minHeight: 600,
    maxWidth: 380,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '20px',

    margin: '20px 15px',
    overflow: 'hidden',
    backgroundColor: vars.colors.white,
    boxShadow: `10px 10px 30px ${vars.colors['gray-5']}`,
  },
  responsiveStyle({
    desktop: {
      height: '100%',
      maxWidth: 1200,
      maxHeight: 800,
      flexDirection: 'row',
    },
  }),
]);

const box = style([
  {
    height: '100%',
    flex: 1,
  },
  flexCenter,
]);

export const leftBox = style([box]);
export const rightBox = style([
  box,
  {
    display: 'none',
    backgroundColor: vars.colors['primary-5'],
  },
  responsiveStyle({
    desktop: {
      display: 'flex',
    },
  }),
]);
