import { style } from '@vanilla-extract/css';

import { vars } from '@styles/theme.css';
import { responsiveStyle } from '@styles/styles.css';

export const container = style([
  {
    width: '100%',
    height: '100%',
    padding: '50px 30px',
    backgroundColor: vars.colors.white,
  },
  responsiveStyle({
    desktop: {
      padding: '100px',
    },
  }),
]);

export const linkField = style([
  {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  responsiveStyle({ desktop: { marginBottom: '30px' } }),
]);

const addtionalDefaultButton = style({
  padding: '10px 15px',
  ':hover': {
    background: vars.colors['primary-1'],
    color: vars.colors['gray-9'],
    borderColor: vars.colors['primary-1'],
  },
  ':active': {
    background: vars.colors['primary-1'],
    color: vars.colors['gray-9'],
    borderColor: vars.colors['primary-1'],
  },
});

export const addLinkButton = style([
  addtionalDefaultButton,
  {
    height: '2.5rem',
  },
]);

export const interestsFieldBox = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '10px',
});

export const myInterestField = style([
  {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: '60px',
  },
  responsiveStyle({ desktop: { marginBottom: '120px' } }),
]);

export const addInterestButton = style([
  addtionalDefaultButton,
  {
    border: '1px solid black',
    width: '4.625rem',
    padding: '14px 25px',
  },
]);
