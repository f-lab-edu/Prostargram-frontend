'use client';

import { ReactNode, useEffect, useState } from 'react';

import { getProfile } from '@/api/my';
import { UserType } from './types/my';
import Mypage from './components/Mypage';

import styles from './layout.module.scss';

interface MypageLayoutProps {
  children?: ReactNode;
}

const MypageLayout = ({ children }: MypageLayoutProps) => {
  const [userData, setUserData] = useState<UserType | undefined>();

  useEffect(() => {
    (async function () {
      const response = await getProfile();
      if (response.isSuccess) {
        setUserData(response.result);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      {userData && <Mypage myData={userData}>{children}</Mypage>}
    </div>
  );
};

export default MypageLayout;
