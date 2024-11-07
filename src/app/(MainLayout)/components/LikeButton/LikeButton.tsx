'use client';

import { useState } from 'react';

import HeartFillIcon from '@/assets/icons/heart-fill.svg';
import HeartIcon from '@/assets/icons/heart.svg';
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

  const clickHandler = () => {
    console.log(postId, commentId);
    setIsToggle(!isToggle);
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
