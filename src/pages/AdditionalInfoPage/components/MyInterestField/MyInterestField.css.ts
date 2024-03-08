import { responsiveStyle } from '@styles/styles.css';
import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

const defaultInput = style([
  {
    position: 'relative',
    padding: '10px 15px',
    border: '1px solid black',
    borderRadius: '10px',
    fontSize: vars.font['body-14'].fontSize,
  },
  responsiveStyle({
    desktop: {
      fontSize: vars.font['body-16'].fontSize,
    },
  }),
]);

export const editing = style([
  defaultInput,
  {
    background: vars.colors['gray-9'],
  },
]);

export const completed = style([
  defaultInput,
  {
    background: vars.colors['primary-1'],
    borderColor: vars.colors['primary-1'],
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

export const circleCloseIcon = style({
  display: 'block',
  position: 'absolute',
  left: 2,
  top: 2,
});
