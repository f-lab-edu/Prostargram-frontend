import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { lightTheme } from '@/styles/theme.css';
import GlobalStyles from '@/styles/global';
import * as Styles from './global.css';

const pretendard = localFont({
  src: [
    { path: '../../public/fonts/Pretendard-Regular.woff2', weight: 'normal' },
    { path: '../../public/fonts/Pretendard-Bold.woff2', weight: 'bold' },
  ],
});

export const metadata: Metadata = {
  title: 'Prostargram',
  description:
    "Prostargram is the word that combine 'Programmer' with 'Instargram'",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.className} ${Styles.container} ${lightTheme}`}
      >
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
