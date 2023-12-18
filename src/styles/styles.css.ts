import { StyleRule } from '@vanilla-extract/css';

interface ResponsiveStyleType {
  tablet?: StyleRule;
  desktop?: StyleRule;
}

export const responsiveStyle = ({
  tablet = {},
  desktop = {},
}: ResponsiveStyleType): StyleRule => ({
  '@media': {
    'screen and (min-width: 768px)': tablet,
    'screen and (min-width: 1024px)': desktop,
  },
});
