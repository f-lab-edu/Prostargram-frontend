import { responsiveStyle } from '@/styles/styles.css';
import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const myInterest = style([
  responsiveStyle({
    desktop: {
      padding: '10px 20px',
      backgroundColor: vars.colors['gray-9'],
      border: `1px solid`,
      borderColor: vars.colors['gray-1'],
      borderRadius: '10px',
      transition: 'background 0.1s',
      cursor: 'pointer',

      ':hover': {
        backgroundColor: vars.colors['primary-2'],
        borderColor: vars.colors['primary-2'],
        color: vars.colors['gray-9'],
      },
    },
  }),
]);
