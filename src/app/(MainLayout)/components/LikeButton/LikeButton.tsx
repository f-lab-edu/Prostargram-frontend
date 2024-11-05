'use client';

import ToggleWrapper from '@/components/common/ToggleWrapper';
import HeartFillIcon from '@/assets/icons/heart-fill.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import clsx from 'clsx';
import styles from './LikeButton.module.scss';

interface LikeButtonProps {
  size?: 'small' | 'medium';
  postId: number;
}

const LikeButton = ({ size = 'small', postId }: LikeButtonProps) => {
  const clickHandler = () => {
    console.log(postId);
  };

  return (
    <ToggleWrapper>
      {({ isToggle, toggleHandler }) => (
        <button
          className={clsx(styles.heart_icon, styles[size])}
          onClick={() => {
            toggleHandler();
            clickHandler();
          }}
        >
          {isToggle ? <HeartFillIcon /> : <HeartIcon />}
        </button>
      )}
    </ToggleWrapper>
  );
};

export default LikeButton;
