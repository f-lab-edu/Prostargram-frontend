import Link from 'next/link';
import { ReactNode } from 'react';

import {
  compactNumberFormatter,
  digitNumberFormatter,
} from '@/utils/formatter';
import * as Styles from './Mypage.css';

interface MypageLayoutProps {
  children?: ReactNode;
}

const MypageLayout = ({ children }: MypageLayoutProps) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.userBackground}>백그라운드 이미 지</div>
      <div className={Styles.flex}>
        <div className={Styles.profileWrapper}>
          <div className={Styles.profile}>프로필 이미지</div>
          <div className={Styles.flex}>
            <div className={Styles.follow}>
              <p>팔로워</p>
              <Link href="/my/follower">
                <p className={Styles.textBlue}>
                  {compactNumberFormatter(1351).toLowerCase()}
                </p>
              </Link>
            </div>
            <div className={Styles.follow}>
              <p>팔로잉</p>
              <Link href="/my/following">
                <p className={Styles.textBlue}>
                  {compactNumberFormatter(4249).toLowerCase()}
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className={Styles.nickname}>닉네임</div>
      </div>
      <div className={Styles.flex}>
        <div className={Styles.feed}>
          <p>피드 작성 개수</p>
          <Link href="/my">
            <p className={Styles.textBlue}>{digitNumberFormatter(13445)}</p>
          </Link>
        </div>
        <div className={Styles.link}>링크</div>
      </div>
      <div className={Styles.flex}>
        <div className={Styles.interest}>관심사</div>
        <div className={Styles.changeableArea}>{children}</div>
      </div>
    </div>
  );
};

export default MypageLayout;
