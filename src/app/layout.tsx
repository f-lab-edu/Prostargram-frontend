import type { Metadata } from 'next';
import localFont from 'next/font/local';

import QueryClientProvider from '@/provider/QueryClientProvider';
import '@/styles/global.scss';

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
      <body className={pretendard.className}>
        <QueryClientProvider>{children}</QueryClientProvider>
        <div id="portal" />
      </body>
    </html>
  );
};

export default RootLayout;
