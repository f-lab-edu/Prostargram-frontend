'use client';

import { useState } from 'react';
import ProfileFollowButton from '@/app/my/components/Profile/ProfileFollowButton';
import MeatBallMenu from '@/assets/icons/meatball_menu.svg';
import styles from './FeedMenu.module.scss';
import { Post } from '../../types/feed';

type FeedMenuProps = {
  post: Post;
};

const FeedMenu = ({ post }: FeedMenuProps) => {
  const isMine = false;
  const isFollow = false;
  const [isToggleMenuOn, setIsToggleMenuOn] = useState(false);

  const updateFeed = () => {
    //   TODO: 피드 업데이트 API 연동 (postType에 따른 분기 처리)
    console.log('post', post);
  };

  const deleteFeed = () => {
    //   TODO: 피드 삭제 API 연동 (postType에 따른 분기 처리)
    console.log('post', post);
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
                onClick={updateFeed}
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
