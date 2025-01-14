'use client';

import { ReactNode } from 'react';

import { getUserId } from '@/utils/manageToken';
import Mypage from './components/Mypage';

import styles from './layout.module.scss';

interface MypageLayoutProps {
  children?: ReactNode;
}

const MypageLayout = ({ children }: MypageLayoutProps) => {
  const userId = getUserId();

  return (
    <div className={styles.container}>
      <Mypage userId={userId}>{children}</Mypage>
    </div>
  );
};

export default MypageLayout;
