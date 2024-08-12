'use client';

import { css, Global } from '@emotion/react';
import emotionReset from 'emotion-reset';

const globalStyle = css`
  ${emotionReset}

  *, html, body {
    box-sizing: border-box;
  }
`;

const GlobalStyles = () => {
  return <Global styles={globalStyle} />;
};

export default GlobalStyles;
