import { ReactNode } from 'react';

import { UserType } from './@types/my';
import Mypage from './components/Mypage';

import styles from './layout.module.scss';

interface MypageLayoutProps {
  children?: ReactNode;
}

const MypageLayout = async ({ children }: MypageLayoutProps) => {
  const result = await fetch('http://localhost:3000/mock/user.json');
  const userData = (await result.json()) as { data: UserType };

  return (
    <div className={styles.container}>
      <Mypage myData={userData.data}>{children}</Mypage>
    </div>
  );
};

export default MypageLayout;
