import { style } from '@vanilla-extract/css';

import { responsiveStyle } from '@/styles/styles.css';
import { vars } from '@/styles/theme.css';
import { flexCenter } from '@/styles/common.css';

const borderBlack = style({
  borderColor: vars.colors['gray-3'],
});

export const flex = style([
  {
    display: 'flex',
  },
]);

export const userBackground = style([
  responsiveStyle({
    desktop: {
      height: '18.75rem',
      backgroundColor: vars.colors['primary-5'],
      borderBottom: `1px solid`,
      borderColor: vars.colors['gray-1'],
    },
  }),
]);

export const profileAndFollowWrapper = style([
  responsiveStyle({
    desktop: {
      width: '18.75rem',
      height: '18.75rem',
      borderBottom: `1px solid`,
      borderColor: vars.colors['gray-1'],
    },
  }),
]);

export const profileWrapper = style([
  flexCenter,
  borderBlack,
  responsiveStyle({
    desktop: {
      position: 'relative',
      width: '100%',
      height: '10.875rem',
      borderRight: `1px solid`,
      borderBottom: `1px solid`,
    },
  }),
]);

export const myInformationWrapper = style([
  borderBlack,
  responsiveStyle({
    desktop: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '2.5rem',
      gap: '1rem',
      borderBottom: '1px solid',
    },
  }),
]);

export const myLinkWrapper = style([
  borderBlack,
  responsiveStyle({
    desktop: {
      flex: 1,
      display: 'flex',
      minHeight: '11.25rem',
      padding: '1.25rem 2.5rem',
      borderBottom: '1px solid',
    },
  }),
]);

export const myInterestWrapper = style([
  borderBlack,
  responsiveStyle({
    desktop: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      width: '18.75rem',
      padding: '2.8125rem',
      borderRight: '1px solid',
    },
  }),
]);

export const myInterestList = style([
  responsiveStyle({
    desktop: { display: 'flex', gap: '5px', flexWrap: 'wrap' },
  }),
]);

export const changeableArea = style([
  responsiveStyle({
    desktop: {
      minHeight: '50rem',
      padding: '2.5rem 4.375rem 0 4.375rem',
    },
  }),
]);
