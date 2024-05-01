import { createTheme, createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  colors: {
    'primary-0': '',
    'primary-1': '',
    'primary-2': '',
    'primary-3': '',
    'primary-4': '',
    'primary-5': '',
    'gray-1': '',
    'gray-2': '',
    'gray-3': '',
    'gray-4': '',
    'gray-5': '',
    'gray-6': '',
    'gray-7': '',
    'gray-8': '',
    'gray-9': '',
    white: '',
    yellow: '',
    red: '',
  },
  font: {
    'body-12': {
      fontSize: '',
    },
    'body-14': {
      fontSize: '',
    },
    'body-16': {
      fontSize: '',
    },
    'body-20': {
      fontSize: '',
    },
    'body-28': {
      fontSize: '',
    },
    'bold-14': {
      fontSize: '',
      fontWeight: '',
    },
    'bold-18': {
      fontSize: '',
      fontWeight: '',
    },
    'bold-20': {
      fontSize: '',
      fontWeight: '',
    },
    'bold-24': {
      fontSize: '',
      fontWeight: '',
    },
    'bold-30': {
      fontSize: '',
      fontWeight: '',
    },
    'bold-32': {
      fontSize: '',
      fontWeight: '',
    },
  },
});

export const lightTheme = createTheme(vars, {
  colors: {
    'primary-0': '#1F408B',
    'primary-1': '#2B59C3',
    'primary-2': '#4A75D7',
    'primary-3': '#829FE3',
    'primary-4': '#B9CAF0',
    'primary-5': '#D5DFF6',
    'gray-1': '#000000',
    'gray-2': '#484848',
    'gray-3': '#7B7B7B',
    'gray-4': '#909090',
    'gray-5': '#B2B2B2',
    'gray-6': '#D9D9D9',
    'gray-7': '#E8E8E8',
    'gray-8': '#F0F0F0',
    'gray-9': '#FBFBFB',
    white: '#FBFBFB',
    yellow: '#FFEECF',
    red: '#D36582',
  },
  font: {
    'body-12': {
      fontSize: '12px',
    },
    'body-14': {
      fontSize: '14px',
    },
    'body-16': {
      fontSize: '16px',
    },
    'body-20': {
      fontSize: '20px',
    },
    'body-28': {
      fontSize: '28px',
    },
    'bold-14': {
      fontSize: '14px',
      fontWeight: 'bold',
    },
    'bold-18': {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    'bold-20': {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    'bold-24': {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    'bold-30': {
      fontSize: '30px',
      fontWeight: 'bold',
    },
    'bold-32': {
      fontSize: '32px',
      fontWeight: 'bold',
    },
  },
});
