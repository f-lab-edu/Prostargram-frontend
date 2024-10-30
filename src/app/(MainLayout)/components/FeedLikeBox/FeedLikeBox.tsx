import { digitNumberFormatter } from '@/utils/formatter';

import CommentIcon from '@/assets/icons/comment.svg';
import LikeButton from '../LikeButton';

import styles from './FeedLikeBox.module.scss';

interface FeedLikeBoxProps {
  postId: number;
  likeCount: number;
  commentCount: number;
}

const FeedLikeBox = ({ postId, likeCount, commentCount }: FeedLikeBoxProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <span>
          <LikeButton postId={postId} />
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
