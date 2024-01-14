import { responsiveStyle } from '@styles/styles.css';
import { vars } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({ width: '100%' });

export const label = style([
  {
    display: 'block',
    marginBottom: 5,
    fontSize: vars.font['body-14'].fontSize,
    color: vars.colors['gray-2'],
    cursor: 'default',
  },
  responsiveStyle({ desktop: {} }),
]);

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

export const inputWrapper = style({
  display: 'flex',
  gap: 5,
  marginTop: 5,
});
