'use client';

import Image from 'next/image';
import { UseQueryResult } from '@tanstack/react-query';

import { getUserId } from '@/utils/manageToken';
import { FollowingRes } from '@/api/follow/apis';
import { HttpSuccessType } from '@/api/httpRequest';
import {
  useGetFollowerList,
  useGetFollowingList,
} from '@/api/follow/followQueries';
import ProfileFollowButton from '../Profile/ProfileFollowButton';

import styles from './FollowList.module.scss';

interface FollowListProps {
  type: 'followings' | 'followers';
}

const followApi: Record<
  FollowListProps['type'],
  (
    userId: number,
    options?: object,
  ) => UseQueryResult<HttpSuccessType<FollowingRes[]>, Error>
> = {
  followings: useGetFollowingList,
  followers: useGetFollowerList,
};

const FollowList = ({ type }: FollowListProps) => {
  const userId = getUserId();
  const { data } = followApi[type](userId, {});

  if (!data || !data.result || data.result.length === 0) {
    return <p>팔로우 한 사람이 없습니다.</p>;
  }

  return data.result.map(
    ({ userId: followerId, userName, departmentName, profileImgUrl }) => (
      <div className={styles.container}>
        <div className={styles.profile_wrapper}>
          <div className={styles.profile_image}>
            {profileImgUrl ? (
              <Image
                src={profileImgUrl}
                width="50"
                height="50"
                alt={`${userName}-profile`}
              />
            ) : (
              '프로필'
            )}
          </div>
          <div className={styles.profile_information}>
            <p className={styles.username}>{userName}</p>
            <p>{departmentName}</p>
          </div>
        </div>
        <ProfileFollowButton userId={followerId} isFollow={false} />
      </div>
    ),
  );
};

export default FollowList;
