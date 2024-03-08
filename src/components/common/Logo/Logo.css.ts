import { responsiveStyle } from '@styles/styles.css';
import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const LogoStyle = style([
  {
    fontSize: vars.font['bold-32'].fontSize,
    fontWeight: vars.font['bold-32'].fontWeight,
    color: vars.colors['primary-1'],
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
    cursor: 'pointer',
  },
  responsiveStyle({
    desktop: {
      fontSize: 60,
    },
  }),
]);
