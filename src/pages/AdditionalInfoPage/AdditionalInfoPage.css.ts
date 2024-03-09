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

export const subTitle = style([
  {
    fontSize: vars.font['bold-20'].fontSize,
    fontWeight: vars.font['bold-20'].fontWeight,
    marginTop: '40px',
    marginBottom: '20px',
  },
  responsiveStyle({
    desktop: {
      marginTop: '50px',
      marginBottom: '30px',
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

const addtionalDefaultButton = style([
  {
    padding: '5px 15px',
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
  },
  responsiveStyle({ desktop: { padding: '10px 15px' } }),
]);

export const addLinkButton = style([
  addtionalDefaultButton,
  {
    height: '1.75rem',
  },
  responsiveStyle({ desktop: { height: '2.5rem' } }),
]);

const defaultFieldBox = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

export const interestsFieldBox = style([
  defaultFieldBox,
  {
    gap: '10px',
  },
]);

export const myInterestErrorMessage = style({
  marginBottom: '10px',
  fontSize: vars.font['body-12'].fontSize,
  color: vars.colors.red,
});

export const myInterestFieldBox = style([
  defaultFieldBox,
  {
    marginBottom: '60px',
  },
  responsiveStyle({ desktop: { marginBottom: '120px' } }),
]);

export const addInterestButton = style([
  addtionalDefaultButton,
  {
    width: '4.625rem',
    height: '41px',
  },
]);
