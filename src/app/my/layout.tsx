import { ReactNode } from 'react';

import Mypage from './components/Mypage';

import * as Styles from './MyFeedpage.css';
import { UserType } from './@types/my';

interface MypageLayoutProps {
  children?: ReactNode;
}

const MypageLayout = async ({ children }: MypageLayoutProps) => {
  const result = await fetch('http://localhost:3000/mock/user.json');
  const userData = (await result.json()) as { data: UserType };

  return (
    <div className={Styles.container}>
      <Mypage myData={userData.data}>{children}</Mypage>
    </div>
  );
};

export default MypageLayout;
