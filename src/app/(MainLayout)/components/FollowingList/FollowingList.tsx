'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Typo from '@/components/common/Typo';
import { useGetFollowingList } from '@/api/follow/followQueries';
import styles from './FollowingList.module.scss';

type FollowingListProps = {
  userId: number;
};

const FollowingList = ({ userId }: FollowingListProps) => {
  const { data: followings } = useGetFollowingList(userId);
  const router = useRouter();

  const moveUserProfilePage = (followingUserId: number) => {
    router.push(`/profile/${followingUserId}`);
  };

  return (
    <ul className={styles.following_ul}>
      {followings?.result &&
        followings?.result?.map((user) => {
          return (
            <li
              className={styles.following_li}
              onClick={() => moveUserProfilePage(user.userId!)}
              aria-hidden="true"
            >
              {user?.profileImgUrl !== null ? (
                <Image
                  className={styles.user_img}
                  src={user.profileImgUrl}
                  alt=""
                  width="50"
                  height="50"
                />
              ) : (
                <Image
                  className={styles.user_img}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s"
                  alt=""
                  width="50"
                  height="50"
                />
              )}
              <Typo
                as="div"
                fontSize="body-14"
                textAlign="center"
                marginTop="6px"
              >
                {user.userName}
              </Typo>
            </li>
          );
        })}
    </ul>
  );
};

export default FollowingList;
