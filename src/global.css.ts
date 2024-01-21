import { globalStyle, style, fontFace } from '@vanilla-extract/css';

const parentElements = ['canvas', 'iframe', 'img', 'svg', 'video'];
const childElements = [
  'svg *',
  'symbol *', // Mozilla Firefox Bug
];

export const Pretendard = fontFace([
  {
    src: 'url("/fonts/Pretendard-Regular.woff2") format("woff2")',
    fontWeight: 'normal',
  },
  {
    src: 'url("/fonts/Pretendard-Bold.woff2") format("woff2")',
    fontWeight: 'bold',
  },
]);

export const font = style({
  fontFamily: Pretendard,
});

globalStyle(`*:not(${[...parentElements, ...childElements].join()})`, {
  all: 'unset',
  display: 'revert',
  boxSizing: 'border-box',
  fontFamily: Pretendard,
});
