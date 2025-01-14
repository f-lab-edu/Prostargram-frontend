'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  compactNumberFormatter,
  digitNumberFormatter,
} from '@/utils/formatter';
import { useGetProfileInformation } from '@/api/profile/profileQuery';

import Follow from '../Follow';
import MyLink from '../MyLink';
import Profile from '../Profile';
import FeedCount from '../FeedCount';
import MyInterest from '../MyInterest';
import FollowList from '../FollowList';
import MyInformation from '../MyInformation';

import styles from './Mypage.module.scss';

interface MyPageProps {
  userId: number;
  slug?: string;
}

type MyPageSearchParamsType = 'followings' | 'followers' | 'feeds';

const isFollow = false;
const isMine = true;

const paramCandidates = ['followers', 'followings', 'feeds'];

const MyPage = ({ slug, userId }: MyPageProps) => {
  const router = useRouter();
  const params = (new URLSearchParams(useSearchParams()).get('page') ||
    'feeds') as MyPageSearchParamsType;
  const { data: myData } = useGetProfileInformation(userId, [userId]);

  const url = slug ? `/profile/${slug}` : '/profile';

  if (!myData || !myData.result || !paramCandidates.includes(params)) {
    router.replace(url);
    return <p>데이터가 없음</p>;
  }

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
  } = myData.result;

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
            <Follow title="팔로워" href={`${url}?page=followers`}>
              {formattedFollowers}
            </Follow>
            <Follow title="팔로잉" href={`${url}?page=followings`}>
              {formattedFollowings}
            </Follow>
          </div>
        </div>
        <div className={styles.my_information_wrapper}>
          <MyInformation
            isMine={isMine}
            username={userName}
            departmentName={departmentName}
            selfIntroduction={selfIntroduction}
          />
        </div>
      </div>
      <div className={styles.display_flex}>
        <FeedCount title="피드 작성 개수" href={url}>
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
        <div className={styles.changeable_area}>
          {params === 'feeds' ? (
            <div>피드</div>
          ) : (
            <FollowList userId={userId} type={params} />
          )}
        </div>
      </div>
    </>
  );
};

export default MyPage;
