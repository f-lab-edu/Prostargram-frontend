import { responsiveStyle } from '@/styles/styles.css';
import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const profileImage = style([
  responsiveStyle({
    desktop: {
      position: 'absolute',
      left: '50%',
      top: '-50%',
      transform: 'translateX(-50%)',
      aspectRatio: 1 / 1,
      backgroundColor: vars.colors['gray-9'],
      border: '1px solid',
      borderColor: vars.colors['gray-4'],
      borderRadius: 9999,
      objectFit: 'contain',
      overflow: 'hidden',
    },
  }),
]);
