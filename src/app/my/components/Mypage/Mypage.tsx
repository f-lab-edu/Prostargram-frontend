import { ReactNode } from 'react';

import {
  compactNumberFormatter,
  digitNumberFormatter,
} from '@/utils/formatter';

import FollowIcon from '@/assets/icons/follow.svg';
import UnfollowIcon from '@/assets/icons/unfollow.svg';

import Button from '@/components/common/Button';
import { UserType } from '../../@types/my';
import Follow from '../Follow';
import MyLink from '../MyLink';
import Profile from '../Profile';
import FeedCount from '../FeedCount';
import MyInterest from '../MyInterest';
import MyInformation from '../MyInformation';

import * as Styles from './Mypage.css';

interface MyPageProps {
  children?: ReactNode;
  myData: UserType;
}

const isFollow = false;

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
      <div className={Styles.userBackground}>백그라운드 이미지</div>
      <div className={Styles.flex}>
        <div className={Styles.profileAndFollowWrapper}>
          <div className={Styles.profileWrapper}>
            <Profile profileUrl={profileUrl}>
              {isFollow ? (
                <Button fill="red">
                  <UnfollowIcon
                    width="20"
                    height="20"
                    style={{ marginLeft: -5, marginRight: 5 }}
                  />
                  언팔로우
                </Button>
              ) : (
                <Button>
                  <FollowIcon
                    width="20"
                    height="20"
                    style={{ marginLeft: -5, marginRight: 5 }}
                  />
                  팔로우
                </Button>
              )}
            </Profile>
          </div>
          <div className={Styles.flex}>
            <Follow title="팔로워" href="/my/follower">
              {formattedFollowers}
            </Follow>
            <Follow title="팔로잉" href="/my/following">
              {formattedFollowings}
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
          {formattedFeedCounts}
        </FeedCount>
        <div className={Styles.myLinkWrapper}>
          <MyLink links={links} />
        </div>
      </div>
      <div className={Styles.flex}>
        <div className={Styles.myInterestWrapper}>
          <p>관심사</p>
          <div className={Styles.myInterestList}>
            {interests.map((interest) => (
              <MyInterest key={interest}>{interest}</MyInterest>
            ))}
          </div>
        </div>
        <div className={Styles.changeableArea}>{children}</div>
      </div>
    </>
  );
};

export default MyPage;
