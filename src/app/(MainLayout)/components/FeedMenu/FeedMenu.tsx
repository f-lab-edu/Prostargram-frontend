'use client';

import { useState } from 'react';
import ProfileFollowButton from '@/app/my/components/Profile/ProfileFollowButton';
import MeatBallMenu from '@/assets/icons/meatball_menu.svg';
import { useDeleteFeed } from '@/api/feed/feedMutations';
import { getUserId } from '@/utils/manageToken';

import { useRouter } from 'next/navigation';
import styles from './FeedMenu.module.scss';

type FeedMenuProps = {
  feed: Feed.FeedData;
};

const FeedMenu = ({ feed }: FeedMenuProps) => {
  const userId = getUserId();

  const isMine = userId === feed?.basicUser?.userId;
  const isFollow = feed?.post?.isFollow;
  const [isToggleMenuOn, setIsToggleMenuOn] = useState(false);

  const router = useRouter();

  const openUpdateFeedModal = () => {
    router.push(
      `?mode=${feed.post.postType.toLowerCase()}&postId=${feed.post.postId}`,
    );
  };

  const { mutate: deleteFeedMutation } = useDeleteFeed(feed?.post?.postId);
  const deleteFeed = () => {
    deleteFeedMutation();
  };

  return (
    <>
      {!isMine && (
        <div className={styles.follow_box}>
          <ProfileFollowButton size="small" isFollow={isFollow} />
        </div>
      )}
      {isMine && (
        <div className={styles.menu_box}>
          <MeatBallMenu
            className={styles.feed_top_menu}
            width="32"
            onClick={() => setIsToggleMenuOn(!isToggleMenuOn)}
          />
          {isToggleMenuOn && (
            <ul className={styles.toggle_menu}>
              <li
                className={styles.update}
                onClick={openUpdateFeedModal}
                aria-hidden="true"
              >
                수정
              </li>
              <li
                className={styles.delete}
                onClick={deleteFeed}
                aria-hidden="true"
              >
                삭제
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default FeedMenu;
