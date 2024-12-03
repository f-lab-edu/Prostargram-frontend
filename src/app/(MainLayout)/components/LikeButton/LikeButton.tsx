'use client';

import { useState } from 'react';
import HeartFillIcon from '@/assets/icons/heart-fill.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import { useDislikeFeed, useLikeFeed } from '@/api/feed/feedMutations';
import {
  useDislikeComment,
  useLikeComment,
} from '@/api/comment/commentMutations';
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
  const { mutate: likeCommentMutation } = useLikeComment(commentId!);
  const { mutate: dislikeCommentMutation } = useDislikeComment(commentId!);

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
      setIsToggle((prev: boolean) => {
        if (prev) {
          dislikeCommentMutation();
          return false;
        }
        if (!prev) {
          likeCommentMutation();
          return true;
        }

        return false;
      });
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
