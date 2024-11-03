import ToggleWrapper from '@/components/common/ToggleWrapper';

import HeartFillIcon from '@/assets/icons/heart-fill.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import styles from './LikeButton.module.scss';

interface LikeButtonProps {
  postId: number;
}

const LikeButton = ({ postId }: LikeButtonProps) => {
  const clickHandler = () => {
    console.log(postId);
  };

  return (
    <ToggleWrapper>
      {({ isToggle, toggleHandler }) => (
        <button
          className={styles.heart_icon}
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
