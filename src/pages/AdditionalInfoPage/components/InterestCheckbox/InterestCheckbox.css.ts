import { responsiveStyle } from '@styles/styles.css';
import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

const defaultCheckbox = style([
  {
    width: 'fit-content',
    padding: '10px 15px',
    border: '1px solid black',
    borderRadius: '10px',
    fontSize: vars.font['body-14'].fontSize,
    cursor: 'pointer',
    transition: 'background 0.1s',
    ':hover': {
      background: vars.colors['primary-1'],
      borderColor: vars.colors['primary-1'],
      color: vars.colors['gray-9'],
    },
  },
  responsiveStyle({
    desktop: {
      fontSize: vars.font['body-16'].fontSize,
    },
  }),
]);

export const checkedBox = style([
  defaultCheckbox,
  {
    background: vars.colors['primary-1'],
    borderColor: vars.colors['primary-1'],
    color: vars.colors['gray-9'],
  },
]);

export const uncheckedBox = style([
  defaultCheckbox,
  {
    background: vars.colors['gray-9'],
    borderColor: vars.colors['gray-1'],
  },
]);
