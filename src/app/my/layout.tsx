import { ReactNode } from 'react';

import Mypage from './components/Mypage';
import * as Styles from './Mypage.css';

const MOCK_DATA_FOR_MY_PAGE = {
  nickname: '닉네임',
  currentState: '취업 준비 중',
  description: '자기소개 등을 작성하는 곳입니다.',
  followers: 1273,
  followings: 2657,
  feeds: 15186,
  links: ['http://www.naver.com', 'http://github.com'],
  interests: ['javascript', 'java', 'react', 'front'],
};

interface MypageLayoutProps {
  children?: ReactNode;
}

const MypageLayout = ({ children }: MypageLayoutProps) => {
  return (
    <div className={Styles.container}>
      <Mypage myData={MOCK_DATA_FOR_MY_PAGE}>{children}</Mypage>
    </div>
  );
};

export default MypageLayout;
