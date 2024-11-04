import { digitNumberFormatter } from '@/utils/formatter';

import CommentIcon from '@/assets/icons/comment.svg';
import LikeButton from '../LikeButton';

import styles from './FeedLikeBox.module.scss';

interface FeedLikeBoxProps {
  postId: number;
  likeCount: number;
  commentCount: number;
  isLike: boolean;
}

const FeedLikeBox = ({
  postId,
  likeCount,
  commentCount,
  isLike,
}: FeedLikeBoxProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <span>
          <LikeButton postId={postId} isLike={isLike} />
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
