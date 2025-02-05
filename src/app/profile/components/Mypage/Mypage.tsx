import { ReactNode } from 'react';

import {
  compactNumberFormatter,
  digitNumberFormatter,
} from '@/utils/formatter';

import { UserType } from '../../types/my';
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
    followerCount,
    followingCount,
    postCount,
    socialAccounts,
    interests,
    userName,
    departmentName,
    selfIntroduction,
    profileImgUrl,
  } = myData;

  const formattedFollowers = compactNumberFormatter(
    followerCount ?? 0,
  ).toLowerCase();

  const formattedFollowings = compactNumberFormatter(
    followingCount ?? 0,
  ).toLowerCase();

  const formattedFeedCounts = digitNumberFormatter(postCount ?? 0);

  const linkStrings = socialAccounts.map(
    ({ socialAccountUrl }) => socialAccountUrl,
  );

  const interestsWithoutHash = interests.map(({ hashTagId, hashTagName }) => ({
    hashTagId,
    hashTagName: hashTagName.slice(1),
  }));

  return (
    <>
      <div className={styles.user_background}>백그라운드 이미지</div>
      <div className={styles.profile_follow_my_information_wrapper}>
        <div className={styles.profile_and_follow_wrapper}>
          <div className={styles.profile_wrapper}>
            <Profile
              isFollow={isFollow}
              isMine={isMine}
              profileUrl={profileImgUrl}
            />
          </div>
          <div className={styles.display_flex}>
            <Follow title="팔로워" href="/profile/follower">
              {formattedFollowers}
            </Follow>
            <Follow title="팔로잉" href="/profile/following">
              {formattedFollowings}
            </Follow>
          </div>
        </div>
        <div className={styles.my_information_wrapper}>
          <MyInformation
            isMine={isMine}
            nickname={userName}
            currentState={departmentName}
            description={selfIntroduction}
          />
        </div>
      </div>
      <div className={styles.display_flex}>
        <FeedCount title="피드 작성 개수" href="/my">
          {formattedFeedCounts}
        </FeedCount>
        <div className={styles.my_link_wrapper}>
          <MyLink links={linkStrings} isMine={isMine} />
        </div>
      </div>
      <div className={styles.display_flex}>
        <div className={styles.my_interest_wrapper}>
          <p>관심사</p>
          <MyInterest isMine={isMine} interests={interestsWithoutHash} />
        </div>
        <div className={styles.changeable_area}>{children}</div>
      </div>
    </>
  );
};

export default MyPage;
