import { globalStyle } from '@vanilla-extract/css';

const parentElements = ['canvas', 'iframe', 'img', 'svg', 'video'];
const childElements = [
  'svg *',
  'symbol *', // Mozilla Firefox Bug
];

globalStyle(`*:not(${[...parentElements, ...childElements].join()})`, {
  all: 'unset',
  display: 'revert',
  boxSizing: 'border-box',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});
