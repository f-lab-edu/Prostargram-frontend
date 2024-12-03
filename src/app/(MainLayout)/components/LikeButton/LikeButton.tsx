'use client';

import { useState } from 'react';
import HeartFillIcon from '@/assets/icons/heart-fill.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import { useDislikeFeed, useLikeFeed } from '@/api/feed/feedMutations';
import clsx from 'clsx';
import styles from './LikeButton.module.scss';

interface LikeButtonProps {
  postId?: number;
  commentId?: number;
  isLike: boolean;
  size?: 'small' | 'medium';
}

const LikeButton = ({
  size = 'small',
  postId,
  commentId,
  isLike,
}: LikeButtonProps) => {
  const [isToggle, setIsToggle] = useState<boolean>(isLike);
  const { mutate: likeFeedMutation } = useLikeFeed(postId!);
  const { mutate: dislikeFeedMutation } = useDislikeFeed(postId!);

  const clickHandler = () => {
    if (postId) {
      setIsToggle((prev: boolean) => {
        if (prev) {
          dislikeFeedMutation();
          return false;
        }
        if (!prev) {
          likeFeedMutation();
          return true;
        }

        return false;
      });
    }

    if (commentId) {
      // TODO: 코멘트 좋아요/좋아요 취소 API 추가
      console.log(commentId);
    }
  };

  return (
    <button
      className={clsx(styles.heart_icon, styles[size])}
      onClick={clickHandler}
    >
      {isToggle ? <HeartFillIcon /> : <HeartIcon />}
    </button>
  );
};

export default LikeButton;
