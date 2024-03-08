import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

const defaultInput = style({
  position: 'relative',
  border: '1px solid black',
  borderRadius: '10px',
  padding: '10px 15px',
});

export const inputEditing = style([
  defaultInput,
  {
    background: vars.colors['gray-9'],
  },
]);

export const inputCompleted = style([
  defaultInput,
  {
    borderColor: vars.colors['primary-1'],
    background: vars.colors['primary-1'],
    color: vars.colors['gray-9'],
    transition: 'background 0.1s',
    cursor: 'pointer',
    ':hover': {
      background: vars.colors['primary-2'],
      borderColor: vars.colors['primary-2'],
    },
  },
]);

export const input = style({
  width: '3rem',
  textAlign: 'center',
});

export const circleX = style({
  display: 'block',
  position: 'absolute',
  left: 2,
  top: 2,
});
