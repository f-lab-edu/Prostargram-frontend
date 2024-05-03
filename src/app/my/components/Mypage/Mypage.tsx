import { ReactNode } from 'react';

import {
  compactNumberFormatter,
  digitNumberFormatter,
} from '@/utils/formatter';

import Follow from '../Follow';
import MyLink from '../MyLink';
import FeedCount from '../FeedCount';
import MyInformation from '../MyInformation';

import * as Styles from './Mypage.css';

interface MyPageProps {
  children?: ReactNode;
  myData: {
    nickname: string;
    currentState: string;
    description: string;
    followers: number;
    followings: number;
    feeds: number;
    links: string[];
    interests: string[];
  };
}

const MyPage = ({ children, myData }: MyPageProps) => {
  const {
    followers,
    followings,
    feeds,
    links,
    interests,
    nickname,
    currentState,
    description,
  } = myData;

  return (
    <>
      <div className={Styles.userBackground}>백그라운드 이미지</div>
      <div className={Styles.flex}>
        <div className={Styles.profileWrapper}>
          <div className={Styles.profile}>프로필 이미지</div>
          <div className={Styles.flex}>
            <Follow title="팔로워" href="/my/follower">
              {compactNumberFormatter(followers ?? 0).toLowerCase()}
            </Follow>
            <Follow title="팔로잉" href="/my/following">
              {compactNumberFormatter(followings ?? 0).toLowerCase()}
            </Follow>
          </div>
        </div>
        <div className={Styles.myInformationWrapper}>
          <MyInformation
            nickname={nickname}
            currentState={currentState}
            description={description}
          />
        </div>
      </div>
      <div className={Styles.flex}>
        <FeedCount title="피드 작성 개수" href="/my">
          {digitNumberFormatter(feeds ?? 0)}
        </FeedCount>
        <div className={Styles.linkWrapper}>
          {links.map((link) => (
            <MyLink key={link}>{link}</MyLink>
          ))}
        </div>
      </div>
      <div className={Styles.flex}>
        <div className={Styles.interest}>
          {interests.map((interest) => (
            <p key={interest}>{interest}</p>
          ))}
        </div>
        <div className={Styles.changeableArea}>{children}</div>
      </div>
    </>
  );
};

export default MyPage;
