'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import MeatBallMenu from '@/assets/icons/meatball_menu.svg';
import Typo from '@/components/common/Typo/Typo';
import If from '@/components/common/If';
import Button from '@/components/common/Button';
import FollowIcon from '@/assets/icons/follow.svg';
import UnfollowIcon from '@/assets/icons/unfollow.svg';
import FavoriteIcon from '@/assets/icons/heart.svg';
import MessageIcon from '@/assets/icons/message.svg';
import useNumberFormat from '@/hooks/useNumberFormat';
import useTimeFormat from '@/hooks/useTimeFormat';
import clsx from 'clsx';
import styles from './Feed.module.scss';

type Post = {
  postId: number;
  userId: number;
  content: string;
  hashTagNames: string[];
  postType: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  isLike: boolean;
  isFollow: boolean;
  contentImageUrls: string;
  preSignedImageUrls: string;
};

type BasicUser = {
  userId: number;
  userName: string;
  profileImgUrl: string;
};

type Feed = {
  post: Post;
  basicUser: BasicUser;
};

type FeedProps = {
  children: ReactNode;
  feed: Feed;
};

const isMine = true;

const Feed = ({ children, feed }: FeedProps) => {
  const { formatWithCommas } = useNumberFormat();
  const { formatElapsedTime } = useTimeFormat();

  const [isToggleMenuOn, setIsToggleMenuOn] = useState(false);
  const [isMoreContent, setIsMoreContent] = useState(false);

  const followHandler = () => {
    //   TODO: 팔로워/팔로잉 생성 API 연동
  };
  const unfollowHandler = () => {
    //   TODO: 팔로워/팔로잉 삭제 API 연동
  };

  const updateFeed = () => {
    //   TODO: 피드 업데이트 API 연동 (postType에 따른 분기 처리)
  };

  const deleteFeed = () => {
    //   TODO: 피드 삭제 API 연동 (postType에 따른 분기 처리)
  };

  return (
    <div className={styles.feed_container}>
      {/* 상단 */}
      <div className={styles.feed_top}>
        {feed?.basicUser.profileImgUrl === '' && (
          <Image
            className={styles.feed_top_profile}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vkwPhD-NHO6sV_3ailgWXjiP_WPM24J3IhkB3xZ-bQ&s"
            alt=""
            width="50"
            height="50"
          />
        )}
        {/* TODO: profileImgUrl src 적용 */}
        {feed?.basicUser.profileImgUrl !== '' && (
          <Image
            className={styles.feed_top_profile}
            src=""
            alt=""
            width="50"
            height="50"
          />
        )}
        <Typo as="span" fontSize="body-20">
          {feed?.basicUser.userName}
        </Typo>
        {!isMine && (
          <If condition={feed?.post.isFollow}>
            <If.True>
              <Button
                className={styles.follow_button}
                size="medium"
                fill="red"
                onClick={unfollowHandler}
              >
                <UnfollowIcon
                  width="20"
                  height="20"
                  style={{ marginLeft: -5, marginRight: 5 }}
                />
                언팔로우
              </Button>
            </If.True>
            <If.False>
              <Button
                className={styles.follow_button}
                size="medium"
                onClick={followHandler}
              >
                <FollowIcon
                  width="20"
                  height="20"
                  style={{ marginLeft: -5, marginRight: 5 }}
                />
                팔로우
              </Button>
            </If.False>
          </If>
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
      </div>
      {/* 중앙 */}
      <div className={styles.feed_center}>{children}</div>
      {/* 하단 */}
      <div className={styles.feed_bottom}>
        <div className={styles.count_box}>
          <FavoriteIcon />
          <span className={styles.like_count}>
            {formatWithCommas(feed.post.likeCount)}
          </span>
          <MessageIcon />
          <span className={styles.comment_count}>
            {formatWithCommas(feed.post.commentCount)}
          </span>
        </div>
        <div className={styles.username_box}>
          <span className={styles.username}>{feed.basicUser.userName}</span>
          <Typo as="span" fontSize="body-14" color="gray-4">
            {formatElapsedTime(feed.post.createdAt)}
          </Typo>
        </div>
        <div className={styles.content_wrapper}>
          <div
            className={clsx(styles.content_box, {
              [styles.two_ellipsis]: !isMoreContent,
            })}
          >
            {!isMoreContent && (
              <span
                className={styles.more}
                onClick={() => setIsMoreContent(true)}
                aria-hidden="true"
              >
                더보기
              </span>
            )}
            {feed.post.content}
          </div>
        </div>
        <div className={styles.hashtag_box}>
          {feed.post.hashTagNames.map((hashtag) => (
            <span className={styles.hashtag}>{hashtag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
