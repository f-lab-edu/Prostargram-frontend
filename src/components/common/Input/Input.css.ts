import { responsiveStyle } from '@styles/styles.css';
import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const defaultWrapperStyle = style([
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    height: 38,
    minWidth: 150,
    padding: '0 10px',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
  },
  responsiveStyle({
    desktop: {
      height: 48,
      fontSize: 16,
    },
  }),
]);

export const wrapperStyles = recipe({
  base: defaultWrapperStyle,
  defaultVariants: { state: 'normal', size: 'small' },
  variants: {
    variants: {
      border: { borderWidth: '1px' },
      noneBorder: { borderWidth: '0' },
    },
    state: {
      normal: [
        {
          ':focus-within': {
            borderColor: vars.colors['primary-1'],
            borderWidth: '2px',
          },
        },
      ],
      fail: [{ borderColor: vars.colors.red, borderWidth: '2px' }],
    },
    size: {
      small: { height: 32 },
      medium: { height: 38 },
      large: { height: 48 },
    },
  },
});

export const inputStyle = style([
  {
    width: '100%',
    fontSize: 14,
    '::placeholder': {
      fontSize: 12,
    },
  },
  responsiveStyle({
    desktop: {
      height: 48,
      fontSize: 16,
      '::placeholder': {
        fontSize: 16,
      },
    },
  }),
]);
