import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

const defaultCheckbox = style({
  padding: '10px 15px',
  border: '1px solid black',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'background 0.1s',
  ':hover': {
    background: vars.colors['primary-2'],
    borderColor: vars.colors['primary-2'],
    color: vars.colors['gray-9'],
  },
});

export const checkedBox = style([
  defaultCheckbox,
  {
    background: vars.colors['primary-1'],
    borderColor: vars.colors['primary-1'],
    color: vars.colors['gray-9'],
    transition: 'background 0.1s',
  },
]);

export const uncheckedBox = style([
  defaultCheckbox,
  {
    background: vars.colors['gray-9'],
    borderColor: vars.colors['gray-1'],
  },
]);
