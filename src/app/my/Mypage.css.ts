import { style } from '@vanilla-extract/css';
import { responsiveStyle } from '@/styles/styles.css';
import { vars } from '@/styles/theme.css';

const flexCenter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const borderBlack = style({
  borderColor: vars.colors['gray-3'],
});

export const flex = style([
  {
    display: 'flex',
  },
]);

export const container = style([
  responsiveStyle({
    desktop: {
      width: '66.875rem',
      border: '1px solid',
      borderColor: vars.colors['gray-3'],
      borderRadius: '10px',
      background: vars.colors.white,
      margin: '1.875rem auto',
      overflow: 'hidden',
    },
  }),
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

export const profileWrapper = style([
  responsiveStyle({
    desktop: {
      width: '18.75rem',
      height: '18.75rem',
      borderBottom: `1px solid`,
      borderColor: vars.colors['gray-1'],
    },
  }),
]);

export const profile = style([
  flexCenter,
  borderBlack,
  responsiveStyle({
    desktop: {
      width: '100%',
      height: '10.875rem',
      borderRight: `1px solid`,
      borderBottom: `1px solid`,
    },
  }),
]);

export const follow = style([
  flexCenter,
  borderBlack,
  responsiveStyle({
    desktop: {
      flex: 1,
      flexDirection: 'column',
      height: '7.75rem',
      borderRight: '1px solid',
    },
  }),
]);

export const textBlue = style([
  responsiveStyle({
    desktop: {
      color: vars.colors['primary-2'],
      fontSize: vars.font['body-28'].fontSize,
      cursor: 'pointer',
      ':hover': {
        color: vars.colors['primary-1'],
        textDecoration: 'underline',
      },
    },
  }),
]);

export const nickname = style([
  borderBlack,
  responsiveStyle({
    desktop: {
      flex: 1,
      padding: '4rem',
      borderBottom: '1px solid',
    },
  }),
]);

export const feed = style([
  flexCenter,
  borderBlack,
  responsiveStyle({
    desktop: {
      flexDirection: 'column',
      width: '18.75rem',
      minHeight: '7.75rem',
      borderBottom: '1px solid',
      borderRight: '1px solid',
    },
  }),
]);

export const link = style([
  borderBlack,
  responsiveStyle({
    desktop: {
      flex: 1,
      padding: '4rem',
      borderBottom: '1px solid',
    },
  }),
]);

export const interest = style([
  borderBlack,
  responsiveStyle({
    desktop: {
      width: '18.75rem',
      padding: '2.8125rem',
      borderRight: '1px solid',
    },
  }),
]);

export const changeableArea = style([
  responsiveStyle({
    desktop: {
      padding: '2.5rem 4.375rem 0 4.375rem',
    },
  }),
]);
