import { ReactNode } from 'react';

import {
  compactNumberFormatter,
  digitNumberFormatter,
} from '@/utils/formatter';

import { UserType } from '../../@types/my';
import Follow from '../Follow';
import MyLink from '../MyLink';
import Profile from '../Profile';
import FeedCount from '../FeedCount';
import MyInterest from '../MyInterest';
import MyInformation from '../MyInformation';

import styles from './Mypage.module.scss';

interface MyPageProps {
  children?: ReactNode;
  myData: UserType;
}

const isFollow = false;
const isMine = true;

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
    profileUrl,
  } = myData;

  const formattedFollowers = compactNumberFormatter(
    followers ?? 0,
  ).toLowerCase();

  const formattedFollowings = compactNumberFormatter(
    followings ?? 0,
  ).toLowerCase();

  const formattedFeedCounts = digitNumberFormatter(feeds ?? 0);

  return (
    <>
      <div className={styles.user_background}>백그라운드 이미지</div>
      <div className={styles.profile_follow_my_information_wrapper}>
        <div className={styles.profile_and_follow_wrapper}>
          <div className={styles.profile_wrapper}>
            <Profile
              isFollow={isFollow}
              isMine={isMine}
              profileUrl={profileUrl}
            />
          </div>
          <div className={styles.display_flex}>
            <Follow title="팔로워" href="/my/follower">
              {formattedFollowers}
            </Follow>
            <Follow title="팔로잉" href="/my/following">
              {formattedFollowings}
            </Follow>
          </div>
        </div>
        <div className={styles.my_information_wrapper}>
          <MyInformation
            isMine={isMine}
            nickname={nickname}
            currentState={currentState}
            description={description}
          />
        </div>
      </div>
      <div className={styles.display_flex}>
        <FeedCount title="피드 작성 개수" href="/my">
          {formattedFeedCounts}
        </FeedCount>
        <div className={styles.my_link_wrapper}>
          <MyLink links={links} isMine={isMine} />
        </div>
      </div>
      <div className={styles.display_flex}>
        <div className={styles.my_interest_wrapper}>
          <p>관심사</p>
          <MyInterest isMine={isMine} interests={interests} />
        </div>
        <div className={styles.changeable_area}>{children}</div>
      </div>
    </>
  );
};

export default MyPage;
