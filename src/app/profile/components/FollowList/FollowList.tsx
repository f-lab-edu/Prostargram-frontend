'use client';

import Image from 'next/image';
import { UseQueryResult } from '@tanstack/react-query';

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
  userId: number;
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

const FollowList = ({ type, userId }: FollowListProps) => {
  const { data } = followApi[type](userId, {});
  const title = type === 'followers' ? '팔로워 페이지' : '팔로잉 페이지';

  if (!data || !data.result || data.result.length === 0) {
    return (
      <>
        <p className={styles.follower_page_subject}>{title}</p>
        <p>팔로우 한 사람이 없습니다.</p>
      </>
    );
  }

  return (
    <>
      <p className={styles.follower_page_subject}>{title}</p>
      <ul className={styles.profile_list}>
        {data.result.map(
          ({ userId: followerId, userName, departmentName, profileImgUrl }) => (
            <li className={styles.container}>
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
            </li>
          ),
        )}
      </ul>
    </>
  );
};

export default FollowList;
