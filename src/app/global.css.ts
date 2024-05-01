import { vars } from '@/styles/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

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

export const container = style({
  width: '100%',
  height: '100vh',
  backgroundColor: vars.colors['gray-9'],
});

// 자동 완성 스타일 초기화
// globalStyle('input:-webkit-autofill', {
//   transition: 'background-color 5000s ease-in-out 0s',
// });
