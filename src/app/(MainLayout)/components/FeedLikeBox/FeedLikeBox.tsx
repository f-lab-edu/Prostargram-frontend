import { digitNumberFormatter } from '@/utils/formatter';

import HeartIcon from '@/assets/icons/heart.svg';
import CommentIcon from '@/assets/icons/comment.svg';
import styles from './FeedLikeBox.module.scss';

interface FeedLikeBoxProps {
  username: string;
  likeCount: number;
  commentCount: number;
}

const FeedLikeBox = ({
  username,
  likeCount,
  commentCount,
}: FeedLikeBoxProps) => {
  console.log(username);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <span>
          <HeartIcon className={styles.like} />
        </span>
        <span>{digitNumberFormatter(likeCount)}</span>
      </div>
      <div className={styles.item}>
        <span>
          <CommentIcon />
        </span>
        <span>{digitNumberFormatter(commentCount)}</span>
      </div>
    </div>
  );
};

export default FeedLikeBox;
